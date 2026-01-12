import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Attendance } from "../../../Schema/Management/Attendance/Attendance.Schema.js";
import { Student } from "../../../Schema/Management/Student/Student.Schema.js";

/* ==========================================
   VALIDATION SCHEMA
========================================== */
const attendanceQuerySchema = Joi.object({
  studentId: Joi.string().length(24).required(),

  batchId: Joi.string().length(24).optional(),
  subjectId: Joi.string().length(24).optional(),

  date: Joi.date().optional(),
  from: Joi.date().optional(),
  to: Joi.date().optional(),

  status: Joi.string()
    .valid("PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE")
    .optional(),

  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(200).default(20),
});

/* ==========================================
   GET STUDENT ATTENDANCE
========================================== */

const getStudentAttendance = asyncHandler(async (req, res) => {
  const { error, value } = attendanceQuerySchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error)
    throw new ApiError(
      400,
      "Invalid query",
      error.details.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }))
    );

  const {
    studentId,
    batchId,
    subjectId,
    date,
    from,
    to,
    status,
    page,
    limit,
  } = value;

  // 1️⃣ Validate student
  const student = await Student.findById(studentId);
  if (!student) throw new ApiError(404, "Student not found");

  // 2️⃣ Build query
  const query = {
    attendeeType: "STUDENT",
    attendeeId: studentId,
  };

  if (batchId) query.batch = batchId;
  if (subjectId) query.subject = subjectId;

  if (status) query.status = status;

  if (date) {
    query.date = new Date(date);
  }

  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  // Pagination
  const skip = (page - 1) * limit;

  // 3️⃣ Run attendance query
  const [records, total] = await Promise.all([
    Attendance.find(query)
      .populate("branch", "name branchCode")
      .populate("batch", "name code")
      .populate("subject", "name code")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Attendance.countDocuments(query),
  ]);

  return successResponse(res, {
    message: "Student attendance fetched successfully",
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: records,
  });
});

export default getStudentAttendance;
