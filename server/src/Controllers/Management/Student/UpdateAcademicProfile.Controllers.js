import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { AcademicProfile } from "../../../Schema/Management/AcademicDetails/AcademicProfile.Schema.js";

/* ====================================================
   VALIDATION SCHEMA
==================================================== */
const updateAcademicSchema = Joi.object({
  academicYear: Joi.string().optional(),
  currentClassYear: Joi.string().optional(),
  board: Joi.string().length(24).optional(),
  course: Joi.string().length(24).optional(),
  medium: Joi.string().valid("ENGLISH", "HINDI", "OTHER").optional(),
  previousAcademics: Joi.array().items(
    Joi.object({
      academicYear: Joi.string().optional(),
      classYear: Joi.string().optional(),
      board: Joi.string().length(24).optional(),
      schoolOrCollegeName: Joi.string().optional(),
      marksObtained: Joi.number().optional(),
      totalMarks: Joi.number().optional(),
      percentage: Joi.number().optional(),
      resultStatus: Joi.string().valid("PASS", "FAIL", "APPEARING").optional(),
    })
  ),
  remarks: Joi.string().allow("").optional(),
});

/* ====================================================
   UPDATE ACADEMIC PROFILE CONTROLLER
==================================================== */
const updateAcademicProfile = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!studentId || studentId.length !== 24) {
    throw new ApiError(400, "Invalid student ID");
  }

  // 1️⃣ Validate payload
  const { error, value } = updateAcademicSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      }))
    );
  }

  // 2️⃣ Check student exists
  const student = await Student.findById(studentId);

  if (!student) throw new ApiError(404, "Student not found");
  if (!student.academicProfile)
    throw new ApiError(404, "Academic profile not found");

  // 3️⃣ Update academic profile fields
  const updatedProfile = await AcademicProfile.findByIdAndUpdate(
    student.academicProfile,
    { $set: value },
    { new: true }
  )
    .populate("board", "name code")
    .populate("course", "name code")
    .lean();

  return successResponse(res, {
    message: "Academic profile updated successfully",
    data: updatedProfile,
  });
});

export default updateAcademicProfile;
