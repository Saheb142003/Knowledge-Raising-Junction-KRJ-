import mongoose from "mongoose";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Leave } from "../../../Schema/Management/Leave/Leave.Schema.js";

export const deleteLeave = asyncHandler(async (req, res) => {
  const { leaveId } = req.params;

  if (!leaveId || leaveId.length !== 24) {
    throw new ApiError(400, "Invalid leave ID");
  }

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const leave = await Leave.findById(leaveId).session(session);
    if (!leave) throw new ApiError(404, "Leave request not found");

    if (leave.isDeleted) {
      throw new ApiError(400, "Leave already deleted");
    }

    leave.isDeleted = true;
    await leave.save({ session });

    await session.commitTransaction();

    const out = leave.toObject ? leave.toObject() : { ...leave };
    if (out.__v !== undefined) delete out.__v;

    return successResponse(res, {
      message: "Leave deleted successfully",
      data: out,
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
