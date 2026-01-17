import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { studentQueryValidationSchema } from "../../../Validations/Admission/Student.Query.Validation.js";

const getStudents = asyncHandler(async (req, res) => {
  /* -------------------------------------------
     1️⃣ VALIDATE QUERY
  -------------------------------------------- */
  const { error, value } = studentQueryValidationSchema.validate(req.query, {
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
    branchId,
    teacherId,
    status,
    from,
    to,
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    order = "desc",
  } = value;

  // Pagination correction
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.max(1, parseInt(limit, 10));

  /* -------------------------------------------
     2️⃣ BUILD QUERY (schema matched)
  -------------------------------------------- */
  const query = { isDeleted: false }; // important

  if (branchId) query.branch = branchId;
  if (status) query.status = status;

  if (teacherId) {
    query.assignedTeacher = { $in: [teacherId] }; // FIXED
  }

  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) query.createdAt.$lte = new Date(to);
  }

  /* -------------------------------------------
     3️⃣ SORTING + PAGINATION
  -------------------------------------------- */
  const skip = (pageNum - 1) * limitNum;
  const sortOrder = order === "asc" ? 1 : -1;

  /* -------------------------------------------
     4️⃣ FETCH DATA
  -------------------------------------------- */
  const [students, total] = await Promise.all([
    Student.find(query)
      .populate("userId", "fullName email phone profileImage role") // ⭐IMPORTANT
      .populate("branch", "name branchCode")
      .populate("academicProfile", "academicYear currentClassYear course medium")
      .populate("idCard", "idNumber status")
      .populate("assignedTeacher", "userId qualification experience")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNum)
      .lean(),

    Student.countDocuments(query),
  ]);

  /* -------------------------------------------
     5️⃣ SANITIZE OUTPUT
  -------------------------------------------- */
  const sanitized = students.map((s) => {
    delete s.__v;
    delete s.password; // safety fallback — Student me password hota nahi but still safe
    if (s.userId) {
      delete s.userId.__v;
      delete s.userId.password; // from User schema
    }
    return s;
  });

  /* -------------------------------------------
     6️⃣ RESPONSE
  -------------------------------------------- */
  return successResponse(res, {
    message: "Students fetched successfully",
    data: {
      total,
      page: pageNum,
      limit: limitNum,
      students: sanitized,
    },
  });
});

export default getStudents;
