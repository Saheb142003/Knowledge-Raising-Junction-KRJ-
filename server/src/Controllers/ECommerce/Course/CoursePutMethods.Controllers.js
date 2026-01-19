import Joi from "joi";
import { accessDurationInDays, accessType, category, description, discountPrice, discountValidTill, isFree, language, level, previewVideoUrl, price, seo, shortDescription, status, subCategory, tags, thumbnailUrl, title } from "../../../Validations/Course/Course.Validations.js";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import mongoose from "mongoose";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import CourseSchema from "../../../Schema/ECommerce/Course/Course.Schema.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";


const updateCourseSchema = Joi.object( {
  // BASIC INFO
  title : title.optional(),
  shortDescription : shortDescription.optional(),
  description : description.optional(),

  // CATEGORY & TAGGING
  category : category.optional(),
  subCategory : subCategory.optional(),
  tags : tags.optional(),
  level : level.optional(),
  language : language.optional(),

  // PRICING
  price : price.optional(),
  discountPrice: discountPrice.optional(),
  discountValidTill : discountValidTill.optional(),
  isFree : isFree.optional(),

  // MEDIA
  thumbnailUrl : thumbnailUrl.optional(),
  previewVideoUrl : previewVideoUrl.optional(),

  // ACCESS POLICY
  accessType : accessType.optional(),
  accessDurationInDays : accessDurationInDays.optional(),

  // SEO
  seo : seo.optional(),

  // STATUS (controlled, but allowed)
  status : status.optional(),

  // ADMIN AUDIT
  updatedBy
}).min(1);



const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid course ID");
  }

  /* =========================
     1. VALIDATE BODY
  ========================== */
  const { error, value } = updateCourseSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  /* =========================
     2. FETCH COURSE
  ========================== */
  const course = await CourseSchema.findById(id);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  /* =========================
     3. BUSINESS RULES
  ========================== */

  // slug must never change
  if ("slug" in value) {
    throw new ApiError(400, "Slug cannot be updated");
  }

  // published course title can change, slug cannot
  // archived course should not be published directly
  if (
    course.status === "ARCHIVED" &&
    value.status === "PUBLISHED"
  ) {
    throw new ApiError(
      400,
      "Archived course cannot be published directly"
    );
  }

  /* =========================
     4. APPLY UPDATE
  ========================== */
  Object.assign(course, value);
  course.updatedBy = req.user._id;

  await course.save();

  return successResponse(res, {
    message: "Course updated successfully",
    data: course
  });
});



export {updateCourse}