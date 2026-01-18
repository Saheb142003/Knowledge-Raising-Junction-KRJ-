import Joi from "joi";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Attendance } from "../../../Schema/Management/Attendance/Attendance.Schema.js";

/* ======================================================
   VALIDATION SCHEMA (ALL FILTERS)
====================================================== */
const attendanceQuerySchema = Joi.object({
  attendeeType: Joi.string().valid("STUDENT", "TEACHER", "EMPLOYEE").optional(),
  attendeeId: Joi.string().length(24).optional(),

  branch: Joi.string().length(24).optional(),
  batch: Joi.string().length(24).optional(),
  subject: Joi.string().length(24).optional(),

  date: Joi.date().optional(),
  from: Joi.date().optional(),
  to: Joi.date().optional(),

  status: Joi.string()
    .valid("PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE")
    .optional(),

  search: Joi.string().optional(), // Search in remarks

  // 🚀 NEW (optional): fetch only active / soft-deleted
  isDeleted: Joi.boolean().optional(), // REMOVE if not needed

  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(200).default(20),

  sortBy: Joi.string()
    .valid("date", "createdAt", "updatedAt", "status")
    .default("date"),

  order: Joi.string().valid("asc", "desc").default("desc"),

  // 🚀 NEW: resolve student/teacher/employee details (optional)
  resolveFor: Joi.string().valid("STUDENT", "TEACHER", "EMPLOYEE").optional(),
});


/* ======================================================
   MASTER GET CONTROLLER
====================================================== */
export const getAttendance = asyncHandler(async (req, res) => {
  /* 1️⃣ Validate query */
  const { error, value } = attendanceQuerySchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ApiError(
      400,
      "Invalid query parameters",
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
    from,
    to,
    status,
    search,
    isDeleted, // NEW FILTER
    resolveFor, // NEW FLAG
    page = 1,
    limit = 20,
    sortBy,
    order,
  } = value;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  /* 2️⃣ Build query */
  const query = {};

  if (attendeeType) query.attendeeType = attendeeType;
  if (attendeeId) query.attendeeId = attendeeId;

  if (branch) query.branch = branch;
  if (batch) query.batch = batch;
  if (subject) query.subject = subject;

  if (status) query.status = status;

  // Single date filter
  if (date) query.date = new Date(date);

  // Date range
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  // Search inside remarks
  if (search) {
    query.remarks = { $regex: search, $options: "i" };
  }

  // Soft delete filter (OPTIONAL)
  if (typeof isDeleted === "boolean") {
    query.isDeleted = isDeleted;
  }

  // Pagination
  const skip = (pageNum - 1) * limitNum;
  const sortOrder = order === "asc" ? 1 : -1;

  /* 3️⃣ Massive optimization: lean + safe population */
  let populateConfig = [
    {
      path: "branch",
      select: "name branchCode",
    },
    {
      path: "batch",
      select: "name code",
    },
    {
      path: "subject",
      select: "name code",
    },
  ];

  // 🚀 NEW OPTIONAL – add dynamic population for student/teacher/employee
  if (resolveFor === "STUDENT")
    populateConfig.push({ path: "attendeeId", select: "fullName userId" });

  if (resolveFor === "TEACHER")
    populateConfig.push({ path: "attendeeId", select: "userId employeeId" });

  if (resolveFor === "EMPLOYEE")
    populateConfig.push({ path: "attendeeId", select: "name employeeCode" });

  /* 4️⃣ Execute Query */
  const [data, total] = await Promise.all([
    Attendance.find(query)
      .populate(populateConfig)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNum)
      .lean(),

    Attendance.countDocuments(query),
  ]);

  /* 5️⃣ Sanitize */
  const sanitized = (data || []).map((d) => {
    delete d.__v;
    return d;
  });

  /* 6️⃣ Response */
  return successResponse(res, {
    message: "Attendance fetched successfully",
    filters: query,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
    data: sanitized,
  });
});
