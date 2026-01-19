import Joi from "joi";
import mongoose from "mongoose";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Attendance } from "../../../Schema/Management/Attendance/Attendance.Schema.js";

/* ======================================================
   VALIDATION FOR UPDATE (SAFE + STRICT)
====================================================== */
const updateValidationSchema = Joi.object({
  status: Joi.string()
    .valid("PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE")
    .optional(),

  checkInTime: Joi.date().allow(null).optional(),
  checkOutTime: Joi.date().allow(null).optional(),

  remarks: Joi.string().allow("").optional(),

  // 🚀 Optional — track who updated it
  updatedBy: Joi.string().length(24).optional(), // REMOVE if not using
});

/* ======================================================
   UPDATE ATTENDANCE (PUT)
====================================================== */
export const updateAttendance = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;

  /* 1️⃣ VALIDATE ID */
  if (!attendanceId || attendanceId.length !== 24) {
    throw new ApiError(400, "Invalid attendance ID");
  }

  /* 2️⃣ VALIDATE BODY */
  const { error, value } = updateValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ApiError(
      400,
      "Invalid update data",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      }))
    );
  }

  let session;

  try {
    /* 3️⃣ START TRANSACTION */
    session = await mongoose.startSession();
    session.startTransaction();

    /* 4️⃣ FIND ATTENDANCE */
    const attendance = await Attendance.findById(attendanceId).session(session);

    if (!attendance) {
      throw new ApiError(404, "Attendance record not found");
    }

    // 🚀 OPTIONAL: prevent update if soft deleted
    if (attendance.isDeleted) {
      throw new ApiError(400, "Cannot update a deleted attendance record");
    }

    /* 5️⃣ UPDATE FIELDS SAFELY */
    Object.assign(attendance, value);

    // Force update timestamp
    attendance.updatedAt = new Date();

    await attendance.save({ session });

    /* 6️⃣ FETCH WITH POPULATION */
    const updated = await Attendance.findById(attendanceId)
      .populate("branch", "name branchCode")
      .populate("batch", "name code")
      .populate("subject", "name code")
      .populate("attendeeId", "fullName userId employeeId") // 🚀 NEW
      .lean()
      .session(session);

    /* 7️⃣ COMMIT TRANSACTION */
    await session.commitTransaction();

    /* 8️⃣ SANITIZE */
    if (updated && updated.__v !== undefined) delete updated.__v;

    /* 9️⃣ SEND RESPONSE */
    return successResponse(res, {
      message: "Attendance updated successfully",
      data: updated,
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
