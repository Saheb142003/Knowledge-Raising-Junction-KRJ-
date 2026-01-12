import Joi from "joi";
import { description, isFreePreview, meta, order, title } from "../../../Validations/CourseContent/CourseContent.Validations.js";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import mongoose from "mongoose";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import CourseContentSchema from "../../../Schema/ECommerce/CourseContent/CourseContent.Schema.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";


export const updateCourseContentSchema = Joi.object({
  title,
  description,
  order,
  isFreePreview,
  meta
}).min(1);


const objectId = Joi.string().custom((v, h) =>
  mongoose.Types.ObjectId.isValid(v)
    ? v
    : h.message("Invalid ObjectId")
);

 const reorderCourseContentSchema = Joi.object({
  course: objectId.required(),

  orders: Joi.array()
    .items(
      Joi.object({
        contentId: objectId.required(),
        order: Joi.number().integer().min(1).required()
      })
    )
    .min(1)
    .required()
});




// ****************UPLOAD LOGIC IS TO BE IMPLEMENTED**************


const updateCourseContent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid content ID");
  }

  /* =========================
     1. VALIDATE BODY
  ========================== */
  const { error, value } = updateCourseContentSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  /* =========================
     2. FETCH CONTENT
  ========================== */
  const content = await CourseContentSchema.findById(id);

  if (!content) {
    throw new ApiError(404, "Course content not found");
  }

  /* =========================
     3. ORDER CONFLICT CHECK
  ========================== */
  if (value.order && value.order !== content.order) {
    const exists = await CourseContent.findOne({
      course: content.course,
      order: value.order,
      _id: { $ne: id }
    });

    if (exists) {
      throw new ApiError(
        409,
        "Another content already exists with this order"
      );
    }
  }

  /* =========================
     4. UPDATE
  ========================== */
  Object.assign(content, value);
  await content.save();

  return successResponse(res, {
    message: "Course content updated successfully",
    data: content
  });
});
const replaceCourseContentFile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  /* =========================
     1. ID + FILE CHECK
  ========================== */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid content ID");
  }

  if (!req.file) {
    throw new ApiError(400, "File is required");
  }

  /* =========================
     2. FETCH CONTENT
  ========================== */
  const content = await CourseContentSchema.findById(id);

  if (!content) {
    throw new ApiError(404, "Course content not found");
  }

  /* =========================
     3. MIME TYPE SAFETY
  ========================== */
  const mimeMap = {
    VIDEO: "video/",
    PDF: "application/pdf",
    QUIZ: null,
    ASSIGNMENT: null
  };

  const expectedMime = mimeMap[content.type];

  if (expectedMime && !req.file.mimetype.startsWith(expectedMime)) {
    throw new ApiError(
      400,
      `Invalid file type for ${content.type}`
    );
  }

  /* =========================
     4. DELETE OLD FILE (OPTIONAL)
  ========================== */
  if (content.contentUrl) {
    await deleteFile(content.contentUrl); 
    // safe delete (S3 / Cloudinary)
  }

  /* =========================
     5. UPLOAD NEW FILE
  ========================== */
  const uploadedUrl = await uploadFile(req.file);

  /* =========================
     6. UPDATE DOC
  ========================== */
  content.contentUrl = uploadedUrl;
  content.fileSizeMB = req.file.size / (1024 * 1024);

  await content.save();

  return successResponse(res, {
    message: "Course content file replaced successfully",
    data: content
  });
});

// PATCH
const reorderCourseContents = asyncHandler(async (req, res) => {
  /* =========================
     1. VALIDATE
  ========================== */
  const { error, value } =
    reorderCourseContentSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const { course, orders } = value;

  /* =========================
     2. UNIQUE ORDER CHECK
  ========================== */
  const orderValues = orders.map(o => o.order);
  if (new Set(orderValues).size !== orderValues.length) {
    throw new ApiError(400, "Duplicate order values are not allowed");
  }

  /* =========================
     3. FETCH CONTENTS
  ========================== */
  const contentIds = orders.map(o => o.contentId);

  const contents = await CourseContent.find({
    _id: { $in: contentIds },
    course
  });

  if (contents.length !== orders.length) {
    throw new ApiError(
      400,
      "Some contents do not belong to the specified course"
    );
  }

  /* =========================
     4. TRANSACTION
  ========================== */
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (const item of orders) {
      await CourseContent.updateOne(
        { _id: item.contentId },
        { $set: { order: item.order } },
        { session }
      );
    }

    await session.commitTransaction();

    return successResponse(res, {
      message: "Course contents reordered successfully"
    });
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
});


export {updateCourseContent,replaceCourseContentFile,reorderCourseContents}