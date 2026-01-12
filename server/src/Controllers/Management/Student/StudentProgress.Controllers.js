import Joi from "joi";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { Test } from "../../../Schema/Management/Test/Test.Schema.js";
import { Assignment } from "../../../Schema/Management/Assignment/Assignment.Schema.js";
import { Attendance } from "../../../Schema/Management/Attendance/Attendance.Schema.js";

/* ======================================================
   VALIDATION SCHEMA
====================================================== */

const studentIdQuerySchema = Joi.object({
  studentId: Joi.string().length(24).required(),
});

/* ======================================================
   GET TEST PERFORMANCE
====================================================== */

export const getTestPerformance = asyncHandler(async (req, res) => {
  const { error, value } = studentIdQuerySchema.validate(req.query);
  if (error)
    throw new ApiError(400, "Invalid studentId");

  const { studentId } = value;

  const tests = await Test.find({ student: studentId })
    .populate("subject", "name code")
    .sort({ date: 1 })
    .lean();

  return successResponse(res, {
    message: "Test performance fetched successfully",
    data: tests,
  });
});

/* ======================================================
   GET ASSIGNMENT PERFORMANCE
====================================================== */

export const getAssignmentPerformance = asyncHandler(async (req, res) => {
  const { error, value } = studentIdQuerySchema.validate(req.query);
  if (error)
    throw new ApiError(400, "Invalid studentId");

  const { studentId } = value;

  const assignments = await Assignment.find({
    submissions: { $exists: true, $ne: [] },
  })
    .populate({
      path: "submissions",
      match: { student: studentId },
      select: "marksObtained status submittedAt",
    })
    .lean();

  const filtered = assignments.filter(
    (a) => a.submissions && a.submissions.length > 0
  );

  return successResponse(res, {
    message: "Assignment performance fetched successfully",
    data: filtered,
  });
});

/* ======================================================
   GET ATTENDANCE SUMMARY
====================================================== */

export const getAttendanceSummary = asyncHandler(async (req, res) => {
  const { error, value } = studentIdQuerySchema.validate(req.query);
  if (error)
    throw new ApiError(400, "Invalid studentId");

  const { studentId } = value;

  const records = await Attendance.find({
    attendeeId: studentId,
    attendeeType: "STUDENT",
  }).lean();

  let present = 0,
    absent = 0,
    late = 0,
    leave = 0;

  records.forEach((r) => {
    if (r.status === "PRESENT") present++;
    if (r.status === "ABSENT") absent++;
    if (r.status === "LATE") late++;
    if (r.status === "ON_LEAVE") leave++;
  });

  return successResponse(res, {
    message: "Attendance summary fetched",
    data: {
      totalDays: records.length,
      present,
      absent,
      late,
      leave,
      attendancePercentage:
        records.length > 0 ? ((present / records.length) * 100).toFixed(2) : 0,
    },
  });
});

/* ======================================================
   GENERATE REPORT CARD (COMBINED DATA)
====================================================== */

export const generateReportCard = asyncHandler(async (req, res) => {
  const { error, value } = studentIdQuerySchema.validate(req.query);
  if (error)
    throw new ApiError(400, "Invalid studentId");

  const { studentId } = value;

  const student = await Student.findById(studentId)
    .populate("branch", "name")
    .populate("academicProfile")
    .populate("assignedTeacher", "fullName")
    .lean();

  if (!student) throw new ApiError(404, "Student not found");

  const tests = await Test.find({ student: studentId })
    .populate("subject", "name code")
    .lean();

  const attendance = await Attendance.find({
    attendeeId: studentId,
    attendeeType: "STUDENT",
  }).lean();

  const assignments = await Assignment.find({
    submissions: { $exists: true },
  })
    .populate({
      path: "submissions",
      match: { student: studentId },
      select: "marksObtained status submittedAt",
    })
    .lean();

  const attendanceSummary = {
    present: attendance.filter((a) => a.status === "PRESENT").length,
    absent: attendance.filter((a) => a.status === "ABSENT").length,
    late: attendance.filter((a) => a.status === "LATE").length,
    leave: attendance.filter((a) => a.status === "ON_LEAVE").length,
  };

  return successResponse(res, {
    message: "Report card generated",
    data: {
      student,
      tests,
      assignments,
      attendanceSummary,
    },
  });
});
