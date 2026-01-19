import Joi from "joi";
import { contentUrl, course, description, durationInMinutes, fileSizeMB, isFreePreview, meta, order, title, type } from "../../../Validations/CourseContent/CourseContent.Validations.js";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import mongoose from "mongoose";
import CourseContentSchema from "../../../Schema/ECommerce/CourseContent/CourseContent.Schema.js";


 const createCourseContentSchema = Joi.object({
  course: course.required(),
  title: title.required(),
  description: description.optional(),
  type: type.required(),
  order: order.required(),
  contentUrl: contentUrl.required(),
  durationInMinutes: durationInMinutes.optional(),
  fileSizeMB: fileSizeMB.optional(),
  isFreePreview: isFreePreview.optional(),
  meta: meta.optional()
}).strict();


 const bulkCreateCourseContentSchema = Joi.object({
  contents: Joi.array()
    .items(createCourseContentSchema)
    .min(1)
    .required()
});

const addCourseContentValidationSchema = Joi.object({
    course: course.required(),

    title: title.required(),

    description,

    type: type.required(),

    order: order.required(),

    contentUrl: contentUrl.required(),

    durationInMinutes,

    fileSizeMB,

    isFreePreview
  });

const bulkCreateCourseContent = asyncHandler(async (req, res) => {
  /* =========================
     1. PARSE BODY
  ========================== */
  if (!req.body.contents) {
    throw new ApiError(400, "Contents payload is required");
  }

  const contents = JSON.parse(req.body.contents);

  /* =========================
     2. VALIDATE
  ========================== */
  const { error, value } =
    bulkCreateCourseContentSchema.validate({ contents });

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  /* =========================
     3. FILE COUNT CHECK
  ========================== */
  if (req.files.length !== value.contents.length) {
    throw new ApiError(
      400,
      "Files count must match contents count"
    );
  }

  /* =========================
     4. UPLOAD FILES
  ========================== */
  const preparedDocs = [];

  for (let i = 0; i < value.contents.length; i++) {
    const content = value.contents[i];
    const file = req.files[i];

    // 🔥 Upload to S3 / Cloudinary / local
    const uploadedUrl = await uploadFile(file); // your service

    preparedDocs.push({
      ...content,
      contentUrl: uploadedUrl
    });
  }

  /* =========================
     5. INSERT (TRANSACTION SAFE)
  ========================== */
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const createdContents = await CourseContentSchema.insertMany(
      preparedDocs,
      { session }
    );

    await session.commitTransaction();

    return successResponse(res, {
      message: "Course contents created successfully",
      data: createdContents
    });
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
});


const createCourseContent = asyncHandler(async (req, res) => {
  /* =========================
     1. FILE CHECK
  ========================== */
  if (!req.file) {
    throw new ApiError(400, "Content file is required");
  }

  /* =========================
     2. VALIDATE BODY
  ========================== */
  const { error, value } = createCourseContentSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  /* =========================
     3. FILE TYPE SAFETY
  ========================== */
  const mimeMap = {
    VIDEO: "video/",
    PDF: "application/pdf",
    QUIZ: null,
    ASSIGNMENT: null
  };

  const expectedMime = mimeMap[value.type];
  if (expectedMime && !req.file.mimetype.startsWith(expectedMime)) {
    throw new ApiError(400, `Invalid file type for ${value.type}`);
  }

  /* =========================
     4. ORDER UNIQUENESS
  ========================== */
  const exists = await CourseContent.findOne({
    course: value.course,
    order: value.order
  });

  if (exists) {
    throw new ApiError(409, "Content order already exists for this course");
  }

  /* =========================
     5. FILE UPLOAD
  ========================== */
  const uploadedUrl = await uploadFile(req.file); 
  // S3 / Cloudinary / Local

  /* =========================
     6. CREATE
  ========================== */
  const content = await CourseContent.create({
    ...value,
    contentUrl: uploadedUrl,
    fileSizeMB: req.file.size / (1024 * 1024)
  });

  return successResponse(res, {
    message: "Course content created successfully",
    data: content
  });
});



const addCourseContent = asyncHandler(async (req, res) => {
  /* =========================
     1. VALIDATE REQUEST BODY
  ========================== */
  

  const { error, value } = addCourseContentValidationSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    throw new ApiError(
      400,
      error.details.map(d => d.message).join(", ")
    );
  }

  /* =========================
     2. EXTRACT DATA
  ========================== */
  const {
    course: courseId,
    title,
    description,
    type,
    order,
    contentUrl,
    durationInMinutes,
    fileSizeMB,
    isFreePreview
  } = value;

  /* =========================
     3. VERIFY COURSE EXISTS
  ========================== */
  const courseDoc = await CourseSchema.findById(courseId);

  if (!courseDoc) {
    throw new ApiError(404, "Course not found");
  }

  /* =========================
     4. PREVENT DUPLICATE ORDER
  ========================== */
  const orderExists = courseDoc.content.some(
    (c) => c.order === order
  );

  if (orderExists) {
    throw new ApiError(
      409,
      `Content with order ${order} already exists`
    );
  }

  /* =========================
     5. CREATE COURSE CONTENT
  ========================== */
  const content = await CourseContentSchema.create({
    course: courseId,
    title,
    description,
    type,
    order,
    contentUrl,
    durationInMinutes,
    fileSizeMB,
    isFreePreview,
    createdBy: "SUPER_ADMIN"
  });

  /* =========================
     6. ATTACH CONTENT TO COURSE
  ========================== */
  courseDoc.content.push({
    content: content._id,
    order,
    isPreview: isFreePreview ?? false
  });

  await courseDoc.save();

  /* =========================
     7. RESPONSE
  ========================== */
  return successResponse(res, {
    message: "Course content added successfully",
    data: content
  });
});

export {bulkCreateCourseContent,createCourseContent,addCourseContent}

