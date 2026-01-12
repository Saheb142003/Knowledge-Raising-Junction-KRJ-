import Joi from "joi";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Leave } from "../../../Schema/Management/Leave/Leave.Schema.js";

/* ==========================================================
   VALIDATION FOR USER HISTORY
========================================================== */
const userLeaveValidation = Joi.object({
  applicantType: Joi.string()
    .valid("STUDENT", "TEACHER", "EMPLOYEE")
    .required(),
 
  applicantId: Joi.string().length(24).required(),

  status: Joi.string()
    .valid("PENDING", "APPROVED", "REJECTED", "CANCELLED")
    .optional(),

  from: Joi.date().optional(),
  to: Joi.date().optional(),

  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(200).default(20),

  sortBy: Joi.string()
    .valid("createdAt", "startDate", "endDate", "status")
    .default("startDate"),

  order: Joi.string().valid("asc", "desc").default("desc"),
});

/* ==========================================================
   CONTROLLER: GET USER LEAVE HISTORY
========================================================== */

export const getUserLeaveHistory = asyncHandler(async (req, res) => {
  const { error, value } = userLeaveValidation.validate(req.query, {
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
    status,
    from,
    to,
    page = 1,
    limit = 20,
    sortBy,
    order,
  } = value;

  // Coerce pagination
  const pageNum = Number.isFinite(Number(page)) && Number(page) > 0 ? parseInt(page, 10) : 1;
  const limitNum = Number.isFinite(Number(limit)) && Number(limit) > 0 ? parseInt(limit, 10) : 20;

  // 1️⃣ BUILD QUERY
  const query = {
    applicantType,
    applicantId,
    isDeleted: false,
  };

  if (status) query.status = status;

  if (from || to) {
    query.startDate = {};
    if (from) query.startDate.$gte = new Date(from);
    if (to) query.startDate.$lte = new Date(to);
  }

  const skip = (pageNum - 1) * limitNum;
  const sortOrder = order === "asc" ? 1 : -1;

  // 2️⃣ GET HISTORY
  const [history, total] = await Promise.all([
    Leave.find(query)
      .populate("branch", "name branchCode")
      .populate("approvedBy", "fullName email")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNum)
      .lean(),

    Leave.countDocuments(query),
  ]);

  // 3️⃣ RESPONSE
  const sanitized = (history || []).map((d) => {
    if (d.__v !== undefined) delete d.__v;
    return d;
  });

  return successResponse(res, {
    message: "Leave history fetched successfully",
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
    data: sanitized,
  });
});
