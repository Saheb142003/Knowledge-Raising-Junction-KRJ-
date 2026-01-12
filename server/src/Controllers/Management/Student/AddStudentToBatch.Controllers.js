import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { Batch } from "../../../Schema/Management/Batch/Batch.Schema.js";

/* =====================================================
   VALIDATION
===================================================== */
const addStudentToBatchSchema = Joi.object({
  studentId: Joi.string().length(24).required(),
  batchId: Joi.string().length(24).required(),
});

/* =====================================================
   ADD STUDENT TO BATCH (LINKING)
===================================================== */

const addStudentToBatch = asyncHandler(async (req, res) => {
  const { error, value } = addStudentToBatchSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }))
    );
  }

  const { studentId, batchId } = value;

  // 1️⃣ Check student exists
  const student = await Student.findById(studentId);
  if (!student) throw new ApiError(404, "Student not found");

  // 2️⃣ Check batch exists
  const batch = await Batch.findById(batchId);
  if (!batch) throw new ApiError(404, "Batch not found");

  // 3️⃣ Check if batch capacity is full
  if (batch.currentStudentCount >= batch.studentCapacity) {
    throw new ApiError(400, "Batch is full, cannot add more students");
  }

  // 4️⃣ Add student to batch
  await Batch.updateOne(
    { _id: batchId },
    {
      $addToSet: { students: studentId },
      $inc: { currentStudentCount: 1 },
    }
  );

  return successResponse(res, {
    message: "Student added to batch successfully",
    data: {
      studentId,
      batchId,
    },
  });
});

export default addStudentToBatch;
