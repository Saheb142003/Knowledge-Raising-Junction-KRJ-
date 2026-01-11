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
  
/* ==========================================================
   VALIDATION
========================================================== */
const approveValidation = Joi.object({
  adminId: Joi.string().length(24).required(),
  remarks: Joi.string().allow("").optional(),
});

/* ==========================================================
   APPROVE LEAVE CONTROLLER
========================================================== */

export const approveLeave = asyncHandler(async (req, res) => {
  const { leaveId } = req.params;

  if (!leaveId || leaveId.length !== 24) {
    throw new ApiError(400, "Invalid leave ID");
  }

  const { error, value } = approveValidation.validate(req.body);

  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      }))
    );
  }

  const { adminId, remarks } = value;

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    // 1️⃣ Find leave request (inside transaction)
    const leave = await Leave.findById(leaveId).session(session);
    if (!leave) throw new ApiError(404, "Leave request not found");
    if (leave.status !== "PENDING")
      throw new ApiError(400, "Only pending leave can be approved");

    // 2️⃣ Approve leave
    leave.status = "APPROVED";
    leave.approvedBy = adminId;
    leave.approvalDate = new Date();
    leave.remarks = remarks || "";
    await leave.save({ session });

    // 3️⃣ Mark attendance for each day (upsert to avoid duplicates)
    const start = new Date(leave.startDate);
    const end = new Date(leave.endDate);

    const dates = [];
    const ONE_DAY = 24 * 60 * 60 * 1000;

    for (let d = start; d <= end; d = new Date(d.getTime() + ONE_DAY)) {
      dates.push(new Date(d));
    }

    let attendanceAdded = 0;
    for (const day of dates) {
      const doc = {
        attendeeType: leave.applicantType,
        attendeeId: leave.applicantId,
        branch: leave.branch,
        batch: null,
        subject: null,
        date: day,
        status: "ON_LEAVE",
        markedBy: adminId,
        remarks: "Leave approved",
      };

      const res = await Attendance.updateOne(
        { attendeeType: doc.attendeeType, attendeeId: doc.attendeeId, date: doc.date },
        { $setOnInsert: doc },
        { upsert: true, session }
      );

      if (res.upsertedCount && res.upsertedCount > 0) attendanceAdded += 1;
    }

    // 4️⃣ Add leaveRef in profile (inside transaction)
    if (leave.applicantType === "STUDENT") {
      await Student.findByIdAndUpdate(
        leave.applicantId,
        { $addToSet: { leaveRef: leave._id } },
        { session }
      );
    }

    if (leave.applicantType === "TEACHER") {
      await Teacher.findByIdAndUpdate(
        leave.applicantId,
        { $addToSet: { leaveRef: leave._id } },
        { session }
      );
    }

    if (leave.applicantType === "EMPLOYEE") {
      await Employee.findByIdAndUpdate(
        leave.applicantId,
        { $addToSet: { leaveRef: leave._id } },
        { session }
      );
    }

    await session.commitTransaction();

    const out = leave.toObject ? leave.toObject() : { ...leave };
    if (out.__v !== undefined) delete out.__v;

    return successResponse(res, {
      message: "Leave approved successfully",
      leave: out,
      attendanceAddedForDays: attendanceAdded,
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
