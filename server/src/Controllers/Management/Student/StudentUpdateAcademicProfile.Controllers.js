import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { AcademicProfile } from "../../../Schema/Management/AcademicDetails/AcademicProfile.Schema.js";

/* ============================================
   VALIDATION SCHEMA
============================================ */
const academicUpdateSchema = Joi.object({
  studentId: Joi.string().length(24).required(),

  academicYear: Joi.string().optional(),
  currentClassYear: Joi.string().optional(),

  board: Joi.string().length(24).optional(),
  course: Joi.string().length(24).optional(),

  medium: Joi.string().valid("ENGLISH", "HINDI", "OTHER").optional(),

  remarks: Joi.string().allow("").optional(),

  previousAcademics: Joi.array()
    .items(
      Joi.object({
        academicYear: Joi.string().optional(),
        classYear: Joi.string().optional(),
        board: Joi.string().length(24).optional(),
        schoolOrCollegeName: Joi.string().optional(),
        marksObtained: Joi.number().optional(),
        totalMarks: Joi.number().optional(),
        percentage: Joi.number().optional(),
        resultStatus: Joi.string()
          .valid("PASS", "FAIL", "APPEARING")
          .optional(),
      })
    )
    .optional(),
});

/* ============================================
   UPDATE ACADEMIC PROFILE CONTROLLER
============================================ */
const updateAcademicProfile = asyncHandler(async (req, res) => {
  // 1️⃣ Validate Body
  const { error, value } = academicUpdateSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ApiError(400, "Validation Failed", error.details);
  }

  const {
    studentId,
    academicYear,
    currentClassYear,
    board,
    course,
    medium,
    previousAcademics,
    remarks,
  } = value;

  // 2️⃣ Find Student
  const student = await Student.findById(studentId);
  if (!student) throw new ApiError(404, "Student Not Found");

  if (!student.academicProfile) {
    throw new ApiError(404, "Academic Profile not created for this student");
  }

  // 3️⃣ Find Academic Profile
  const profile = await AcademicProfile.findById(student.academicProfile);
  if (!profile) throw new ApiError(404, "Academic Profile not found");

  // 4️⃣ Partial Update
  if (academicYear) profile.academicYear = academicYear;
  if (currentClassYear) profile.currentClassYear = currentClassYear;
  if (board) profile.board = board;
  if (course) profile.course = course;
  if (medium) profile.medium = medium;
  if (remarks !== undefined) profile.remarks = remarks;

  if (previousAcademics) {
    profile.previousAcademics = previousAcademics; // replace array
  }

  await profile.save();

  // 5️⃣ Response
  return successResponse(res, {
    message: "Academic profile updated successfully",
    profile,
  });
});

export default updateAcademicProfile;
