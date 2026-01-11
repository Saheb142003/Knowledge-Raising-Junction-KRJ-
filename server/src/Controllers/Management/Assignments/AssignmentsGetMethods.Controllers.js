import Joi from "joi";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Assignment } from "../../../Schema/Management/Assignments/Assignments.Schema.js";
 
/* =============================
   QUERY VALIDATION (INLINE)
   ============================= */
const assignmentQueryValidation = Joi.object({
  batchId: Joi.string().length(24).optional(),
  subjectId: Joi.string().length(24).optional(),
  teacherId: Joi.string().length(24).optional(),

  from: Joi.date().optional(),
  to: Joi.date().optional(),

  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(20),

  sortBy: Joi.string().valid("createdAt", "dueDate", "title").default("createdAt"),
  order: Joi.string().valid("asc", "desc").default("desc"),
});

/* =============================
   GET ASSIGNMENTS CONTROLLER
   ============================= */
export const getAssignments = asyncHandler(async (req, res) => {
  // 1️⃣ Validate Query
  const { error, value } = assignmentQueryValidation.validate(req.query, {
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
    batchId,
    subjectId,
    teacherId,
    from,
    to,
    page = 1,
    limit = 20,
    sortBy,
    order,
  } = value;

  const pageNum = Number.isFinite(Number(page)) && Number(page) > 0 ? parseInt(page, 10) : 1;
  const limitNum = Number.isFinite(Number(limit)) && Number(limit) > 0 ? parseInt(limit, 10) : 20;

  // 2️⃣ Build Query Object
  const query = {};

  if (batchId) query.batches = batchId;
  if (subjectId) query.subject = subjectId;
  if (teacherId) query.createdBy = teacherId;

  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) query.createdAt.$lte = new Date(to);
  }

  // Pagination
  const skip = (pageNum - 1) * limitNum;
  const sortOrder = order === "asc" ? 1 : -1;

  // 3️⃣ Fetch Data
  const [assignments, total] = await Promise.all([
    Assignment.find(query)
      .populate("batches", "name startYear endYear")
      .populate("subject", "name code")
      .populate("createdBy", "userId employeeId")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNum)
      .lean(),

    Assignment.countDocuments(query),
  ]);

  // 4️⃣ Response
  const sanitized = (assignments || []).map((a) => {
    if (a.__v !== undefined) delete a.__v;
    return a;
  });

  return successResponse(res, {
    message: "Assignments fetched successfully",
    data: {
      total,
      page: pageNum,
      limit: limitNum,
      assignments: sanitized,
    },
  });
});
