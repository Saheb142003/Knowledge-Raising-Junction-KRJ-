import Joi from "joi";
import mongoose from "mongoose";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Leave } from "../../../Schema/Management/Leave/Leave.Schema.js";
import { Attendance } from "../../../Schema/Management/Attendance/Attendance.Schema.js";
import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";
import { Employee } from "../../../Schema/Management/Employee/Employee.Schema.js";

const cancelValidation = Joi.object({
  applicantId: Joi.string().length(24).required(),
});

export const cancelLeave = asyncHandler(async (req, res) => {
  const { leaveId } = req.params;

  if (!leaveId || leaveId.length !== 24) {
    throw new ApiError(400, "Invalid leave ID");
  }

  const { error, value } = cancelValidation.validate(req.body);
  if (error) {
    throw new ApiError(400, "Validation failed");
  }

  const { applicantId } = value;

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const leave = await Leave.findById(leaveId).session(session);
    if (!leave) throw new ApiError(404, "Leave not found");

    // Allow cancellation for PENDING or APPROVED (if approved, clean up attendance & refs)
    if (!["PENDING", "APPROVED"].includes(leave.status)) {
      throw new ApiError(400, "Only pending or approved leave can be cancelled");
    }

    if (leave.applicantId.toString() !== applicantId) {
      throw new ApiError(403, "Not authorized to cancel this leave");
    }

    const prevStatus = leave.status;

    leave.status = "CANCELLED";
    leave.remarks = leave.remarks ? `${leave.remarks} | Cancelled by user` : "Cancelled by user";
    await leave.save({ session });

    let attendanceRemoved = 0;
    if (prevStatus === "APPROVED") {
      // Remove ON_LEAVE attendance entries for the leave period
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);

      const delRes = await Attendance.deleteMany(
        {
          attendeeType: leave.applicantType,
          attendeeId: leave.applicantId,
          date: { $gte: start, $lte: end },
          status: "ON_LEAVE",
        },
        { session }
      );

      attendanceRemoved = delRes.deletedCount || 0;

      // Remove leaveRef from profiles
      if (leave.applicantType === "STUDENT") {
        await Student.findByIdAndUpdate(
          leave.applicantId,
          { $pull: { leaveRef: leave._id } },
          { session }
        );
      }

      if (leave.applicantType === "TEACHER") {
        await Teacher.findByIdAndUpdate(
          leave.applicantId,
          { $pull: { leaveRef: leave._id } },
          { session }
        );
      }

      if (leave.applicantType === "EMPLOYEE") {
        await Employee.findByIdAndUpdate(
          leave.applicantId,
          { $pull: { leaveRef: leave._id } },
          { session }
        );
      }
    }

    await session.commitTransaction();

    const out = leave.toObject ? leave.toObject() : { ...leave };
    if (out.__v !== undefined) delete out.__v;

    return successResponse(res, {
      message: "Leave cancelled successfully",
      data: out,
      attendanceRemoved,
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
