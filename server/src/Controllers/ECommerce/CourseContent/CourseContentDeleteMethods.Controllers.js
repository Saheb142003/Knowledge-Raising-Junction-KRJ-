import mongoose from "mongoose";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import CourseContentSchema from "../../../Schema/ECommerce/CourseContent/CourseContent.Schema.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";



const softDeleteCourseContent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  /* =========================
     1. VALIDATE ID
  ========================== */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid content ID");
  }

  /* =========================
     2. FETCH CONTENT
  ========================== */
  const content = await CourseContentSchema.findById(id);

  if (!content) {
    throw new ApiError(404, "Course content not found");
  }

  if (!content.isActive) {
    throw new ApiError(400, "Course content already deleted");
  }

  /* =========================
     3. SOFT DELETE
  ========================== */
  content.isActive = false;
  await content.save();

  return successResponse(res, {
    message: "Course content deleted successfully"
  });
});


export {softDeleteCourseContent}