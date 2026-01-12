import mongoose from "mongoose";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import CourseContentSchema from "../../../Schema/ECommerce/CourseContent/CourseContent.Schema.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";


// requires middleware for checking enrollment
const getCourseContentsPublic = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }

  const isEnrolled = req.user?.isEnrolled; // assume middleware sets this

  const filter = {
    course: courseId,
    isActive: true
  };

  if (!isEnrolled) {
    filter.isFreePreview = true;
  }

  const contents = await CourseContentSchema.find(filter)
    .sort({ order: 1 })
    .select("-meta"); // hide quiz answers etc

  return successResponse(res, {
    message: "Course contents fetched successfully",
    data: contents
  });
});

const getCourseContentByIdAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid content ID");
  }

  const content = await CourseContentSchema.findById(id);

  if (!content) {
    throw new ApiError(404, "Course content not found");
  }

  return successResponse(res, {
    message: "Course content fetched successfully",
    data: content
  });
});
const getCourseContentByIdPublic = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid content ID");
  }

  const content = await CourseContentSchema.findOne({
    _id: id,
    isActive: true
  });

  if (!content) {
    throw new ApiError(404, "Content not found");
  }

  const isEnrolled = req.user?.isEnrolled;

  if (!content.isFreePreview && !isEnrolled) {
    throw new ApiError(403, "You are not allowed to access this content");
  }

  return successResponse(res, {
    message: "Content fetched successfully",
    data: content
  });
});

// LANDING PAGE USE ONLY 

const getPreviewContents = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }

  const contents = await CourseContentSchema.find({
    course: courseId,
    isActive: true,
    isFreePreview: true
  })
    .sort({ order: 1 })
    .select("title type durationInMinutes order");

  return successResponse(res, {
    message: "Preview contents fetched successfully",
    data: contents
  });
});

export{getCourseContentByIdAdmin,getCourseContentByIdPublic,getCourseContentsPublic,getPreviewContents}