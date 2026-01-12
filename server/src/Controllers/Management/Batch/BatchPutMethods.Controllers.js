import Joi from "joi";
import { endDate, isActive, name, startDate, studentCapacity, teacherCapacity } from "../../../Validations/Batch/Batch.Validations.js";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import mongoose from "mongoose";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import { Batch } from "../../../Schema/Management/Batch/Batch.Schema.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";



const updatableBatchFields = Joi.object({
  name: name.optional(),
  startDate: startDate.optional(),
  endDate: endDate.optional(),
  studentCapacity: studentCapacity.optional(),
  teacherCapacity: teacherCapacity.optional(),
  isActive: isActive.optional()
}).min(1) .messages({
    "object.min": "At least one field is required to update the batch"
  });


 const updateBatchDetails = asyncHandler(async (req, res) => {
  const { batchId } = req.params;
  const adminId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(batchId)) {
    throw new ApiError(400, "Invalid batch ID");
  }

  /* =========================
     1. JOI VALIDATION (INLINE)
  ========================== */
  const { error, value } = updatableBatchFields.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message
      }))
    );
  }

  /* =========================
     2. FETCH BATCH
  ========================== */
  const batch = await Batch.findById(batchId);
  if (!batch) {
    throw new ApiError(404, "Batch not found");
  }

  /* =========================
     3. AUTHORIZATION
  ========================== */
  if (!batch.managedBy.includes(adminId)) {
    throw new ApiError(403, "You are not allowed to update this batch");
  }

  /* =========================
     4. CAPACITY CHECKS
  ========================== */
  if (
    value.studentCapacity !== undefined &&
    value.studentCapacity < batch.currentStudentCount
  ) {
    throw new ApiError(
      400,
      "Student capacity cannot be less than current student count"
    );
  }

  if (
    value.teacherCapacity !== undefined &&
    value.teacherCapacity < batch.currentTeacherCount
  ) {
    throw new ApiError(
      400,
      "Teacher capacity cannot be less than current teacher count"
    );
  }

  /* =========================
     5. APPLY UPDATE
  ========================== */
  Object.assign(batch, value);
  await batch.save();

  return successResponse(res, {
    message: "Batch updated successfully",
    data: batch
  });
});


export {updateBatchDetails}




