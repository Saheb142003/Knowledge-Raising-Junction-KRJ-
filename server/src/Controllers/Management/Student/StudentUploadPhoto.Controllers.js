import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";

/* =========================================
   VALIDATION
========================================= */
const uploadPhotoValidation = Joi.object({
  studentId: Joi.string().length(24).required(),
  photoUrl: Joi.string().uri().required(), // Cloudinary URL
});

/* =========================================
   CONTROLLER: UPLOAD / UPDATE PHOTO
========================================= */
const uploadStudentPhoto = asyncHandler(async (req, res) => {
  const { error, value } = uploadPhotoValidation.validate(req.body, {
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

  const { studentId, photoUrl } = value;

  // 1️⃣ Find student
  const student = await Student.findById(studentId);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // 2️⃣ Update photo
  student.photo = photoUrl;
  await student.save();

  // 3️⃣ Response
  return successResponse(res, {
    message: "Profile photo updated successfully",
    photoUrl,
  });
});

export default uploadStudentPhoto;
