import Joi from "joi";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Leave } from "../../../Schema/Management/Leave/Leave.Schema.js";

/* ==========================================================
   VALIDATION SCHEMA FOR QUERY
========================================================== */
const leaveQueryValidation = Joi.object({
  applicantType: Joi.string()
    .valid("STUDENT", "TEACHER", "EMPLOYEE")
    .optional(),
 
  applicantId: Joi.string().length(24).optional(),
  branch: Joi.string().length(24).optional(),

  status: Joi.string()
    .valid("PENDING", "APPROVED", "REJECTED", "CANCELLED")
    .optional(),

  from: Joi.date().optional(),
  to: Joi.date().optional(),

  search: Joi.string().optional(), // search reason/remarks

  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(200).default(20),

  sortBy: Joi.string()
    .valid("createdAt", "startDate", "endDate", "status")
    .default("createdAt"),

  order: Joi.string().valid("asc", "desc").default("desc"),
});

/* ==========================================================
   CONTROLLER: GET ALL LEAVES
========================================================== */

export const getAllLeaves = asyncHandler(async (req, res) => {
  const { error, value } = leaveQueryValidation.validate(req.query, {
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
    applicantType,
    applicantId,
    branch,
    status,
    from,
    to,
    search,
    page = 1,
    limit = 20,
    sortBy,
    order,
  } = value;

  // Coerce pagination to numbers
  const pageNum = Number.isFinite(Number(page)) && Number(page) > 0 ? parseInt(page, 10) : 1;
  const limitNum = Number.isFinite(Number(limit)) && Number(limit) > 0 ? parseInt(limit, 10) : 20;

  // 1️⃣ BUILD QUERY OBJECT
  const query = { isDeleted: false };

  if (applicantType) query.applicantType = applicantType;
  if (applicantId) query.applicantId = applicantId;
  if (branch) query.branch = branch;

  if (status) query.status = status;

  if (from || to) {
    query.startDate = {};
    if (from) query.startDate.$gte = new Date(from);
    if (to) query.startDate.$lte = new Date(to);
  }

  // Search inside reason or remarks
  if (search) {
    query.$or = [
      { reason: { $regex: search, $options: "i" } },
      { remarks: { $regex: search, $options: "i" } },
    ];
  }

  // Pagination + Sorting
  const skip = (pageNum - 1) * limitNum;
  const sortOrder = order === "asc" ? 1 : -1;

  // 2️⃣ RUN QUERY IN PARALLEL
  const [data, total] = await Promise.all([
    Leave.find(query)
      .populate("branch", "name branchCode")
      .populate("approvedBy", "fullName email")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNum)
      .lean(),

    Leave.countDocuments(query),
  ]);

  // 3️⃣ RESPONSE — sanitize and normalize pagination
  const sanitized = (data || []).map((d) => {
    if (d.__v !== undefined) delete d.__v;
    return d;
  });

  return successResponse(res, {
    message: "All leave requests fetched successfully",
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
    data: sanitized,
  });
});
