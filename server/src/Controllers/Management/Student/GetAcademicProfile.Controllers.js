import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { AcademicProfile } from "../../../Schema/Management/AcademicDetails/AcademicProfile.Schema.js";

/* ====================================================
   VALIDATION SCHEMA
==================================================== */
const getAcademicSchema = Joi.object({
  studentId: Joi.string().length(24).required(),
});

/* ====================================================
   GET ACADEMIC PROFILE CONTROLLER
==================================================== */
const getAcademicProfile = asyncHandler(async (req, res) => {
  // 1️⃣ Validate Query
  const { error, value } = getAcademicSchema.validate(req.params);

  if (error) {
    throw new ApiError(
      400,
      "Invalid student ID",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      }))
    );
  }

  const { studentId } = value;

  // 2️⃣ Find Student
  const student = await Student.findById(studentId)
    .select("fatherName motherName bloodGroup gender dob")
    .populate("branch", "name branchCode address");

  if (!student) throw new ApiError(404, "Student not found");

  if (!student.academicProfile)
    throw new ApiError(404, "Academic profile not created");

  // 3️⃣ Find Academic Profile
  const profile = await AcademicProfile.findById(student.academicProfile)
    .populate("board", "name code")
    .populate("course", "name code")
    .lean();

  if (!profile) {
    throw new ApiError(404, "Academic profile not found");
  }

  // 4️⃣ Response
  return successResponse(res, {
    message: "Academic profile fetched successfully",
    student,
    profile,
  });
});

export default getAcademicProfile;
