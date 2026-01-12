import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { AcademicProfile } from "../../../Schema/Management/AcademicDetails/AcademicProfile.Schema.js";

/* ====================================================
   VALIDATION SCHEMA (ONE ENTRY)
==================================================== */
const previousAcademicSchema = Joi.object({
  academicYear: Joi.string().required(),
  classYear: Joi.string().required(),

  board: Joi.string().length(24).optional(),
  schoolOrCollegeName: Joi.string().optional(),

  marksObtained: Joi.number().optional(),
  totalMarks: Joi.number().optional(),
  percentage: Joi.number().optional(),

  resultStatus: Joi.string()
    .valid("PASS", "FAIL", "APPEARING")
    .optional(),
});

/* ====================================================
   ADD PREVIOUS ACADEMIC ENTRY
==================================================== */
const addPreviousAcademic = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!studentId || studentId.length !== 24) {
    throw new ApiError(400, "Invalid student ID");
  }

  // 1️⃣ Validate Payload
  const { error, value } = previousAcademicSchema.validate(req.body, {
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

  // 2️⃣ Find student
  const student = await Student.findById(studentId);
  if (!student) throw new ApiError(404, "Student not found");
  if (!student.academicProfile)
    throw new ApiError(404, "Academic profile not found");

  // 3️⃣ Push previous academic entry
  const updatedProfile = await AcademicProfile.findByIdAndUpdate(
    student.academicProfile,
    {
      $push: {
        previousAcademics: value,
      },
    },
    { new: true }
  )
    .populate("board", "name code")
    .populate("course", "name code")
    .lean();

  return successResponse(res, {
    message: "Previous academic record added successfully",
    data: updatedProfile,
  });
});

export default addPreviousAcademic;
