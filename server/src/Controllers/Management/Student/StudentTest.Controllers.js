import Joi from "joi";
import mongoose from "mongoose";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Test } from "../../../Schema/Management/Test/Test.Schema.js";
import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { Subject } from "../../../Schema/Management/Subject/Subject.Schema.js";
import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";

/* ======================================================
   VALIDATION
====================================================== */

// Create Test
const testCreateSchema = Joi.object({
  studentId: Joi.string().length(24).required(),
  subjectId: Joi.string().length(24).required(),
  teacherId: Joi.string().length(24).required(),

  testName: Joi.string().min(2).required(),

  date: Joi.date().required(),
  maxMarks: Joi.number().min(1).required(),
  obtainedMarks: Joi.number().min(0).max(Joi.ref("maxMarks")).required(),

  remarks: Joi.string().allow("").optional(),
});

// Update Test
const testUpdateSchema = Joi.object({
  testName: Joi.string().min(2).optional(),

  date: Joi.date().optional(),
  obtainedMarks: Joi.number().min(0).optional(),
  maxMarks: Joi.number().min(1).optional(),

  remarks: Joi.string().allow("").optional(),
});

// Query Filter
const testQuerySchema = Joi.object({
  studentId: Joi.string().length(24).required(),
  subjectId: Joi.string().length(24).optional(),

  from: Joi.date().optional(),
  to: Joi.date().optional(),
});

/* ======================================================
   CONTROLLER: Create Test Record
====================================================== */

export const createTestRecord = asyncHandler(async (req, res) => {
  const { error, value } = testCreateSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error)
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((e) => ({ field: e.path.join("."), message: e.message }))
    );

  const {
    studentId,
    subjectId,
    teacherId,
    testName,
    date,
    maxMarks,
    obtainedMarks,
    remarks,
  } = value;

  // Validate student
  const student = await Student.findById(studentId);
  if (!student) throw new ApiError(404, "Student not found");

  // Validate subject
  const subject = await Subject.findById(subjectId);
  if (!subject) throw new ApiError(404, "Subject not found");

  // Validate teacher
  const teacher = await Teacher.findById(teacherId);
  if (!teacher) throw new ApiError(404, "Teacher not found");

  const testRecord = await Test.create({
    student: studentId,
    subject: subjectId,
    teacher: teacherId,
    testName,
    date,
    maxMarks,
    obtainedMarks,
    remarks,
  });

  // Add reference in student
  await Student.findByIdAndUpdate(studentId, {
    $addToSet: { testRecords: testRecord._id },
  });

  return successResponse(res, {
    statusCode: 201,
    message: "Test record created successfully",
    data: testRecord,
  });
});

/* ======================================================
   CONTROLLER: Get Test Records
====================================================== */

export const getStudentTests = asyncHandler(async (req, res) => {
  const { error, value } = testQuerySchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error)
    throw new ApiError(
      400,
      "Invalid query params",
      error.details.map((e) => ({ field: e.path.join("."), message: e.message }))
    );

  const { studentId, subjectId, from, to } = value;

  const query = { student: studentId };

  if (subjectId) query.subject = subjectId;

  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  const tests = await Test.find(query)
    .populate("subject", "name code")
    .populate("teacher", "userId")
    .sort({ date: -1 })
    .lean();

  return successResponse(res, {
    message: "Student tests fetched successfully",
    data: tests,
  });
});

/* ======================================================
   CONTROLLER: Update Test Record
====================================================== */

export const updateTestRecord = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  if (!testId || testId.length !== 24)
    throw new ApiError(400, "Invalid test ID");

  const { error, value } = testUpdateSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error)
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((e) => ({ field: e.path.join("."), message: e.message }))
    );

  const updated = await Test.findByIdAndUpdate(testId, value, {
    new: true,
  })
    .populate("subject", "name code")
    .lean();

  if (!updated) throw new ApiError(404, "Test record not found");

  return successResponse(res, {
    message: "Test record updated successfully",
    data: updated,
  });
});

/* ======================================================
   CONTROLLER: Delete Test Record
====================================================== */

export const deleteTestRecord = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  if (!testId || testId.length !== 24)
    throw new ApiError(400, "Invalid test ID");

  const test = await Test.findById(testId);
  if (!test) throw new ApiError(404, "Test record not found");

  await Student.findByIdAndUpdate(test.student, {
    $pull: { testRecords: test._id },
  });

  await Test.findByIdAndDelete(testId);

  return successResponse(res, {
    message: "Test record deleted successfully",
    testId,
  });
});

/* ======================================================
   CONTROLLER: Student Test Summary
====================================================== */

export const getStudentTestSummary = asyncHandler(async (req, res) => {
  const { studentId } = req.query;

  if (!studentId || studentId.length !== 24)
    throw new ApiError(400, "Invalid student ID");

  const tests = await Test.find({ student: studentId });

  if (tests.length === 0)
    return successResponse(res, {
      message: "No tests found",
      data: {
        totalTests: 0,
        average: 0,
        highest: 0,
        lowest: 0,
      },
    });

  const totalTests = tests.length;
  const marks = tests.map((t) => t.obtainedMarks);
  const average = Number((marks.reduce((a, b) => a + b, 0) / totalTests).toFixed(2));

  const summary = {
    totalTests,
    average,
    highest: Math.max(...marks),
    lowest: Math.min(...marks),
  };

  return successResponse(res, {
    message: "Student test summary calculated",
    data: summary,
  });
});
