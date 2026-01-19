import Joi from "joi";
import mongoose from "mongoose";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Assignment } from "../../../Schema/Management/Assignments/Assignments.Schema.js";
import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";
import { Batch } from "../../../Schema/Management/Batch/Batch.Schema.js";
import { Subject } from "../../../Schema/Management/Subjects/Subject.Schema.js";

/* =============================
   UPDATE VALIDATION
============================= */
const assignmentUpdateValidation = Joi.object({
  title: Joi.string().min(2).optional(),
  description: Joi.string().allow("").optional(),
  dueDate: Joi.date().optional(),
  maxMarks: Joi.number().min(1).optional(),
  fileUrl: Joi.string().uri().allow("").optional(),

  batches: Joi.array().items(Joi.string().length(24)).optional(),
  subject: Joi.string().length(24).optional(),

  // EXTRA (optional but helpful)
  isActive: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(), // soft delete toggle
});

/* =============================
   UPDATE ASSIGNMENT CONTROLLER
============================= */
export const updateAssignment = asyncHandler(async (req, res) => {
  const { assignmentId } = req.params;

  if (!assignmentId || assignmentId.length !== 24) {
    throw new ApiError(400, "Invalid Assignment ID");
  }

  // 1️⃣ Validate input
  const { error, value } = assignmentUpdateValidation.validate(req.body, {
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

  let session;

  try {
    // 2️⃣ Start DB Transaction
    session = await mongoose.startSession();
    session.startTransaction();

    // 3️⃣ Find Assignment
    const assignment = await Assignment.findById(assignmentId).session(session);

    if (!assignment) {
      throw new ApiError(404, "Assignment not found");
    }

    const oldBatches = assignment.batches.map((b) => b.toString());
    const newBatches = value.batches?.map((b) => b.toString()) || null;

    /* =============================
       4️⃣ Validate Subject (if changed)
    ============================== */
    if (value.subject) {
      const subjectExists = await Subject.findById(value.subject).session(session);
      if (!subjectExists) {
        throw new ApiError(404, "Subject not found");
      }
    }

    /* =============================
       5️⃣ Validate Batches (if changed)
    ============================== */
    if (newBatches) {
      const batchCount = await Batch.countDocuments({
        _id: { $in: newBatches },
      }).session(session);

      if (batchCount !== newBatches.length) {
        throw new ApiError(400, "One or more batches are invalid");
      }
    }

    /* =============================
       6️⃣ FIX FILE URL FIELD NAME
       (Schema uses FileUrl, not fileUrl)
    ============================== */
    if (value.fileUrl !== undefined) {
      assignment.FileUrl = value.fileUrl; // map correctly
      delete value.fileUrl;
    }

    /* =============================
       7️⃣ Soft Delete Support (optional)
    ============================== */
    if (typeof value.isDeleted === "boolean") {
      assignment.isDeleted = value.isDeleted;
      if (value.isDeleted === true) assignment.deletedAt = new Date();
      if (value.isDeleted === false) assignment.deletedAt = null;
    }

    // 8️⃣ Update fields
    Object.assign(assignment, value);
    await assignment.save({ session });

    /* =============================
       9️⃣ Update Batch.assignments[]
    ============================== */
    if (newBatches) {
      // Remove from old batches
      await Batch.updateMany(
        { _id: { $in: oldBatches } },
        { $pull: { assignments: assignment._id } },
        { session }
      );

      // Add to new batches
      await Batch.updateMany(
        { _id: { $in: newBatches } },
        { $addToSet: { assignments: assignment._id } },
        { session }
      );
    }

    // 🔟 Commit
    await session.commitTransaction();

    const result = assignment.toObject ? assignment.toObject() : { ...assignment };
    delete result.__v;

    return successResponse(res, {
      message: "Assignment updated successfully",
      data: result,
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
