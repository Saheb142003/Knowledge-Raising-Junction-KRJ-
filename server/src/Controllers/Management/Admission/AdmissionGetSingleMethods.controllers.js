import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";

const getSingleStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    throw new ApiError(400, "Student ID is required");
  }

  // ⭐ IMPORTANT: Do NOT return soft-deleted students
  const student = await Student.findOne({
    _id: studentId,
    isDeleted: false,
  })
    // Populate USER DETAILS
    .populate("userId", "fullName email phone profileImage role")
    // Populate Branch
    .populate("branch", "name branchCode address")
    // Academic Profile full population
    .populate({
      path: "academicProfile",
      populate: [
        { path: "board", select: "name code" },
        { path: "course", select: "name courseCode" },
      ],
    })

    // Populate Teachers → via user
    .populate({
      path: "assignedTeacher",
      populate: {
        path: "userId",
        select: "fullName email phone profileImage",
      },
      select: "qualification experience",
    })

    // Populate ID Card
    .populate("idCard", "idNumber photo status issueDate expiryDate")

    .lean();

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Remove internal fields
  delete student.__v;
  delete student.password; // safe fallback
  if (student.userId) delete student.userId.__v;

  return successResponse(res, {
    message: "Student fetched successfully",
    data: student,
  });
});

export default getSingleStudent;
