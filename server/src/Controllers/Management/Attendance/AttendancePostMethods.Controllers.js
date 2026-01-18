import Joi from "joi";
import mongoose from "mongoose";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Attendance } from "../../../Schema/Management/Attendance/Attendance.Schema.js";
import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";
import { Employee } from "../../../Schema/Management/Employee/Employee.Schema.js";
import { Branch } from "../../../Schema/Management/Branch/Branch.Schema.js";
import { Batch } from "../../../Schema/Management/Batch/Batch.Schema.js";
import { Subject } from "../../../Schema/Management/Subjects/Subject.Schema.js";


/* =====================================
   VALIDATION SCHEMA
===================================== */
const attendanceCreateValidation = Joi.object({
  attendeeType: Joi.string()
    .valid("STUDENT", "TEACHER", "EMPLOYEE")
    .required(),

  attendeeId: Joi.string().length(24).required(),

  branch: Joi.string().length(24).required(),

  batch: Joi.string().length(24).allow(null, "").optional(),
  subject: Joi.string().length(24).allow(null, "").optional(),

  date: Joi.date().required(),

  status: Joi.string()
    .valid("PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE")
    .required(),

  checkInTime: Joi.date().allow(null).optional(),
  checkOutTime: Joi.date().allow(null).optional(),

  markedBy: Joi.string().length(24).required(),

  remarks: Joi.string().allow("").optional(),

  // EXTRA FEATURE FOR FUTURE:
  softCreate: Joi.boolean().optional(), // (NOT used now)
});


/* =====================================
   CREATE ATTENDANCE
===================================== */
export const markAttendance = asyncHandler(async (req, res) => {
  let session;

  try {
    /* 1️⃣ Validate input */
    const { error, value } = attendanceCreateValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new ApiError(
        400,
        "Validation Failed",
        error.details.map((d) => ({
          field: d.path.join("."),
          message: d.message,
        }))
      );
    }

    const {
      attendeeType,
      attendeeId,
      branch,
      batch,
      subject,
      date,
      status,
      checkInTime,
      checkOutTime,
      markedBy,
      remarks,
    } = value;


    /* 2️⃣ Start Transaction */
    session = await mongoose.startSession();
    session.startTransaction();


    /* 3️⃣ Validate Branch */
    const branchExists = await Branch.findById(branch).session(session);
    if (!branchExists) throw new ApiError(404, "Branch not found");


    /* 4️⃣ Validate Batch if present */
    if (batch) {
      const batchExists = await Batch.findById(batch).session(session);
      if (!batchExists) throw new ApiError(404, "Batch not found");
    }


    /* 5️⃣ Validate Subject if present */
    if (subject) {
      const subjectExists = await Subject.findById(subject).session(session);
      if (!subjectExists) throw new ApiError(404, "Subject not found");
    }


    /* 6️⃣ Validate attendee & enforce rules */
    if (attendeeType === "STUDENT") {
      const student = await Student.findById(attendeeId).session(session);
      if (!student) throw new ApiError(404, "Student not found");

      // If student → batch must match student.batch (optional rule)
      // (REMOVE if not needed)
      /*
      if (batch && student.batches && !student.batches.includes(batch)) {
        throw new ApiError(400, "Student does not belong to this batch");
      }
      */
    }

    if (attendeeType === "TEACHER") {
      const teacher = await Teacher.findById(attendeeId).session(session);
      if (!teacher) throw new ApiError(404, "Teacher not found");

      // TEACHER → batch is OPTIONAL
      // TEACHER → subject recommended
    }

    if (attendeeType === "EMPLOYEE") {
      const employee = await Employee.findById(attendeeId).session(session);
      if (!employee) throw new ApiError(404, "Employee not found");

      // EMPLOYEE → batch & subject MUST be null
      // (REMOVE if not needed)
      /*
      if (batch || subject) {
        throw new ApiError(400, "Employee attendance cannot have batch/subject");
      }
      */
    }


    /* 7️⃣ Prevent duplicate attendance for same person on same date
          Our schema already enforces unique index:
          attendeeType + attendeeId + date
    */

    /* 8️⃣ Create Attendance */
    const [attendance] = await Attendance.create(
      [
        {
          attendeeType,
          attendeeId,
          branch,
          batch: batch || null,
          subject: subject || null,
          date,
          status,
          checkInTime: checkInTime || null,
          checkOutTime: checkOutTime || null,
          markedBy,
          remarks: remarks || "",
        },
      ],
      { session }
    );


    /* 9️⃣ Commit */
    await session.commitTransaction();

    const result = attendance?.toObject ? attendance.toObject() : attendance;
    if (result?.__v !== undefined) delete result.__v;

    return successResponse(res, {
      statusCode: 201,
      message: "Attendance marked successfully",
      data: result,
    });

  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
