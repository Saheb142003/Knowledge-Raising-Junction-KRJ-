import Joi from "joi";
import mongoose from "mongoose";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Assignment, Submission } from "../../../Schema/Management/Assignments/Assignments.Schema.js";
import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";
import { Batch } from "../../../Schema/Management/Batch/Batch.Schema.js";

/* ============================
   PARAM VALIDATION
============================ */
const assignmentDeleteParamSchema = Joi.object({
  assignmentId: Joi.string().length(24).required(),

  // EXTRA SUPPORT ADDED (Optional):
  // softDelete=true => soft delete instead of hard delete
  softDelete: Joi.boolean().optional(),
});

/* ============================
   DELETE ASSIGNMENT CONTROLLER
============================ */
export const deleteAssignment = asyncHandler(async (req, res) => {
  // 1️⃣ Validate Params
  const { error, value } = assignmentDeleteParamSchema.validate(
    { ...req.params, ...req.query },
    { abortEarly: false, stripUnknown: true }
  );

  if (error) {
    throw new ApiError(400, "Invalid Assignment ID");
  }

  const { assignmentId, softDelete = false } = value;

  let session;
  try {
    // 2️⃣ Start DB Transaction
    session = await mongoose.startSession();
    session.startTransaction();

    // 3️⃣ Fetch Assignment
    const assignment = await Assignment.findById(assignmentId).session(session);
    if (!assignment) throw new ApiError(404, "Assignment not found");

    const teacherId = assignment.createdBy;
    const batchIds = assignment.batches;

    /* ============================
       4️⃣ SOFT DELETE OPTION
    ============================ */
    if (softDelete === true) {
      assignment.isActive = false;      // ← if schema doesn’t have, remove
      assignment.isDeleted = true;      // ← if schema doesn’t have, remove
      assignment.deletedAt = new Date(); // ← same
      await assignment.save({ session });

      // Also soft delete submissions
      await Submission.updateMany(
        { assignment: assignmentId },
        {
          isDeleted: true,    // ← depends on your schema
          deletedAt: new Date(),
        },
        { session }
      );

      await session.commitTransaction();

      return successResponse(res, {
        message: "Assignment soft-deleted successfully",
        data: { assignmentId, softDeleted: true },
      });
    }

    /* ============================
       5️⃣ HARD DELETE FLOW
    ============================ */

    // Delete all Submissions of this Assignment
    await Submission.deleteMany({ assignment: assignmentId }).session(session);

    // Remove from Teacher.assignments[]
    await Teacher.updateOne(
      { _id: teacherId },
      { $pull: { assignments: assignment._id } },
      { session }
    );

    // Remove from Batch.assignments[]
    await Batch.updateMany(
      { _id: { $in: batchIds } },
      { $pull: { assignments: assignment._id } },
      { session }
    );

    // Delete the Assignment
    await Assignment.findByIdAndDelete(assignmentId).session(session);

    // 6️⃣ Commit
    await session.commitTransaction();

    return successResponse(res, {
      message: "Assignment deleted successfully",
      data: { assignmentId, softDeleted: false },
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
