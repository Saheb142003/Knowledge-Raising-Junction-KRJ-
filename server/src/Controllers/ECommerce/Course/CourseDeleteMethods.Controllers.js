import mongoose from "mongoose";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import CourseSchema from "../../../Schema/ECommerce/Course/Course.Schema.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import CourseContentSchema from "../../../Schema/ECommerce/CourseContent/CourseContent.Schema.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

const softDeleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid course ID");
  }

  /* =========================
     1. FETCH COURSE
  ========================== */
  const course = await CourseSchema.findById(id);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (!course.isActive) {
    throw new ApiError(400, "Course already deleted");
  }

  /* =========================
     2. TRANSACTION
  ========================== */
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    /* =========================
       3. SOFT DELETE COURSE
    ========================== */
    course.isActive = false;
    course.status = "ARCHIVED";
    course.updatedBy = req.user._id;

    await course.save({ session });

    /* =========================
       4. SOFT DELETE CONTENTS
    ========================== */
    await CourseContentSchema.updateMany(
      { course: id, isActive: true },
      { $set: { isActive: false } },
      { session }
    );

    await session.commitTransaction();

    return successResponse(res, {
      message: "Course and related contents deleted successfully"
    });
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
});



export {softDeleteCourse}