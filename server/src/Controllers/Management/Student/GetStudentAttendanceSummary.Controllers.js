import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Attendance } from "../../../Schema/Management/Attendance/Attendance.Schema.js";
import { Student } from "../../../Schema/Management/Student/Student.Schema.js";

/* ==========================================
   VALIDATION SCHEMA
========================================== */
const summaryQuerySchema = Joi.object({
  studentId: Joi.string().length(24).required(),

  // OPTIONAL — summary window (month or custom)
  month: Joi.number().min(1).max(12).optional(),
  year: Joi.number().min(2000).max(2100).optional(),

  from: Joi.date().optional(),
  to: Joi.date().optional(),
});

/* ==========================================
   GET STUDENT ATTENDANCE SUMMARY
========================================== */

const getStudentAttendanceSummary = asyncHandler(async (req, res) => {
  const { error, value } = summaryQuerySchema.validate(req.query, {
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

  const { studentId, month, year, from, to } = value;

  // 1️⃣ Validate student
  const student = await Student.findById(studentId);
  if (!student) throw new ApiError(404, "Student not found");

  // 2️⃣ Build query
  const query = {
    attendeeType: "STUDENT",
    attendeeId: studentId,
  };

  // Filter by month/year
  if (month && year) {
    const start = new Date(year, month - 1, 1); // Month start
    const end = new Date(year, month, 0, 23, 59, 59); // Month end

    query.date = { $gte: start, $lte: end };
  }

  // Filter by date range
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  // 3️⃣ Fetch attendance
  const attendance = await Attendance.find(query).lean();

  // 4️⃣ Calculate summary
  let summary = {
    totalDays: attendance.length,
    present: 0,
    absent: 0,
    late: 0,
    halfDay: 0,
    leave: 0,
    percentage: 0,
  };

  attendance.forEach((a) => {
    switch (a.status) {
      case "PRESENT":
        summary.present++;
        break;
      case "ABSENT":
        summary.absent++;
        break;
      case "LATE":
        summary.late++;
        break;
      case "HALF_DAY":
        summary.halfDay++;
        break;
      case "ON_LEAVE":
        summary.leave++;
        break;
    }
  });

  // Attendance Percentage
  const totalValid = summary.present + summary.absent; // leave, late not counted
  if (totalValid > 0)
    summary.percentage = Number(
      ((summary.present / totalValid) * 100).toFixed(2)
    );

  return successResponse(res, {
    message: "Attendance summary generated",
    filtersUsed: value,
    summary,
  });
});

export default getStudentAttendanceSummary;
