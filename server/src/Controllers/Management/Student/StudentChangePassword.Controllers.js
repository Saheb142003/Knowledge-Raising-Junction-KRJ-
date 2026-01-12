import Joi from "joi";
import bcrypt from "bcryptjs";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";

/* =========================================
   VALIDATION
========================================= */
const changePasswordValidation = Joi.object({
  studentId: Joi.string().length(24).required(),

  oldPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

/* =========================================
   CONTROLLER: CHANGE PASSWORD
========================================= */
const changeStudentPassword = asyncHandler(async (req, res) => {
  const { error, value } = changePasswordValidation.validate(req.body, {
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

  const { studentId, oldPassword, newPassword } = value;

  // 1️⃣ Find student
  const student = await Student.findById(studentId);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // 2️⃣ Check existing password
  const match = await bcrypt.compare(oldPassword, student.password);
  if (!match) {
    throw new ApiError(401, "Old password is incorrect");
  }

  // 3️⃣ Update password
  const hashed = await bcrypt.hash(newPassword, 10);

  student.password = hashed;
  await student.save();

  // 4️⃣ Response
  return successResponse(res, {
    message: "Password changed successfully",
  });
});

export default changeStudentPassword;
