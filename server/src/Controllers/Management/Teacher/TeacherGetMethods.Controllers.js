import Joi from "joi";
import mongoose from "mongoose";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";

/* ============================================================
   VALIDATION SCHEMA
============================================================ */
const teacherQueryValidationSchema = Joi.object({
  branch: Joi.string().length(24).optional(),
  batch: Joi.string().length(24).optional(),
  subject: Joi.string().length(24).optional(),

  specialization: Joi.string().optional(),
  search: Joi.string().optional(),

  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(200).default(20),

  sortBy: Joi.string().valid("createdAt", "fullName").default("createdAt"),
  order: Joi.string().valid("asc", "desc").default("desc"),
});

/* ============================================================
   GET ALL TEACHERS
============================================================ */
export const getAllTeachers = asyncHandler(async (req, res) => {
  const { error, value } = teacherQueryValidationSchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error)
    throw new ApiError(
      400,
      "Invalid query parameters",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      }))
    );

  const {
    branch,
    batch,
    subject,
    specialization,
    search,
    page,
    limit,
    sortBy,
    order,
  } = value;

  // 1️⃣ Base query: Only active teachers
  const query = { isDeleted: false };

  if (branch) query.branches = branch;
  if (batch) query.batches = batch;
  if (subject) query.subjects = subject;

  if (specialization)
    query.specialization = new RegExp(specialization, "i");

  if (search) {
    query.$or = [
      { qualifications: { $regex: search, $options: "i" } },
      { specialization: { $regex: search, $options: "i" } },
    ];
  }

  // Pagination + Sorting
  const skip = (page - 1) * limit;
  const sortOrder = order === "asc" ? 1 : -1;

  const sortField =
    sortBy === "fullName" ? "userId.fullName" : sortBy;

  // 2️⃣ Fetch Data
  const [teachers, total] = await Promise.all([
    Teacher.find(query)
      .populate("userId", "fullName email phone profileImage")
      .populate("branches", "name branchCode")
      .populate("batches", "name code")
      .populate("subjects", "name code")
      .populate("createdBy", "fullName email")
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean(),

    Teacher.countDocuments(query),
  ]);

  return successResponse(res, {
    message: "Teachers fetched successfully",
    data: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      teachers,
    },
  });
});

/* ============================================================
   GET SINGLE TEACHER
============================================================ */
export const getTeacherById = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new ApiError(400, "Invalid teacher ID");
  }

  const teacher = await Teacher.findById(teacherId)
    .where("isDeleted").equals(false)
    .populate("userId", "fullName email phone profileImage")
    .populate("branches", "name branchCode address")
    .populate("batches", "name code startDate endDate")
    .populate("subjects", "name code")
    .populate("createdBy", "fullName email")
    .lean();

  if (!teacher) throw new ApiError(404, "Teacher not found");

  return successResponse(res, {
    message: "Teacher fetched successfully",
    data: teacher,
  });
});

export { getAllTeachers, getTeacherById };
