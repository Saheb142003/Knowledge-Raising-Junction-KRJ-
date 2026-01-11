import Joi from "joi"
import { category, createdBy, description, instructors, previewVideoUrl, price, shortDescription, slug, thumbnailUrl, title, name,profileImage,bio,expertise } from "../../../Validations/Course/Course.Validations.js"
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";
import CourseSchema from "../../../Schema/ECommerce/Course/Course.Schema.js";
import CourseContentSchema from "../../../Schema/ECommerce/CourseContent/CourseContent.Schema.js";


const createCourseValidationSchema = Joi.object({
  /* =========================
     CORE REQUIRED FIELDS
  ========================== */
  title: title.required(),

  slug: slug.required(),

  description: description.required(),

  category: category.required(),

  price: price.required(),

  thumbnailUrl: thumbnailUrl.required(),

   instructors: instructors.required(),

  createdBy: createdBy.required(),

  /* =========================
     OPTIONAL BUT ALLOWED
  ========================== */
  shortDescription,

  previewVideoUrl,

  level,

  language,

  tags,

  accessType,

  accessDurationInDays
}).when(Joi.object({ accessType: Joi.valid("TIME_BOUND") }).unknown(), {
    then: Joi.object({
      accessDurationInDays: Joi.number().positive().required().messages({
        "any.required":
          "Access duration is required for time-bound courses"
      })
    })
  });


const InstructorValidationSchema = Joi.object({
    instructors : instructors.required()
})

const instructorValidationSchema = Joi.object({
        name : name.required(),
        bio : bio.required(),
        expertise : expertise.required()

})

const replaceInstructorValidationSchema = Joi.object({
  oldInstructor: instructorValidationSchema.required()
    .messages({
      "any.required": "Old instructor data is required"
    }),

  newInstructor: instructorValidationSchema.required()
    .messages({
      "any.required": "New instructor data is required"
    })
});



 const createCourse = asyncHandler(async (req, res) => {
  /* =========================
     1. VALIDATE REQUEST BODY
  ========================== */
  const { error, value } = createCourseValidationSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    throw new ApiError(
      400,
      error.details.map((d) => d.message).join(", ")
    );
  }

  /* =========================
     2. EXTRACT DATA
  ========================== */
  const {
    title,
    slug,
    description,
    shortDescription,
    category,
    price,
    thumbnailUrl,
    previewVideoUrl,
    instructors,
    level,
    language,
    tags,
    accessType,
    accessDurationInDays
  } = value;

  /* =========================
     3. CHECK DUPLICATE SLUG
  ========================== */
  const existingCourse = await CourseSchema.findOne({ slug });

  if (existingCourse) {
    throw new ApiError(409, "Course with this slug already exists");
  }

  /* =========================
     4. CREATE COURSE (DRAFT)
  ========================== */
  const course = await CourseSchema.create({
    title,
    slug,
    description,
    shortDescription,
    category,
    price,
    thumbnailUrl,
    previewVideoUrl,
    instructors,
    level,
    language,
    tags,
    accessType,
    accessDurationInDays,

    status: "DRAFT",
    createdBy: req.admin._id // injected by ecomAdminAuth middleware
  });

  
  return successResponse(res, {
    message: "Course created successfully (Draft)",
    data: course
  });
});

 const publishCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  /* =========================
     1. FIND COURSE
  ========================== */
  const course = await CourseSchema.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  /* =========================
     2. BASIC STATE CHECK
  ========================== */
  if (course.status === "PUBLISHED") {
    throw new ApiError(400, "Course is already published");
  }

  /* =========================
     3. VALIDATION BEFORE PUBLISH
     (VERY IMPORTANT)
  ========================== */

  // At least one instructor
  if (!course.instructors || course.instructors.length === 0) {
    throw new ApiError(
      400,
      "Course must have at least one instructor before publishing"
    );
  }

  // At least one content item
  const contentCount = await CourseContentSchema.countDocuments({
    course: course._id,
    isActive: true
  });

  if (contentCount === 0) {
    throw new ApiError(
      400,
      "Course must have at least one content item before publishing"
    );
  }

  // Pricing sanity
  if (!course.isFree && (!course.price || course.price <= 0)) {
    throw new ApiError(
      400,
      "Paid course must have a valid price before publishing"
    );
  }

  /* =========================
     4. PUBLISH COURSE
  ========================== */
  course.status = "PUBLISHED";
  course.publishedAt = new Date();
  course.isActive = true;
  course.updatedBy = req.admin._id;

  await course.save();

  /* =========================
     5. RESPONSE
  ========================== */
  return successResponse(res, {
    message: "Course published successfully",
    data: {
      courseId: course._id,
      status: course.status,
      publishedAt: course.publishedAt
    }
  });
});

const addInstructorsToTheCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  /* =========================
     1. VALIDATE PAYLOAD
  ========================== */
  const { error, value } = InstructorValidationSchema.validate(
    { instructors: req.body.instructors },
    { abortEarly: false }
  );

  if (error) {
    throw new ApiError(
      400,
      error.details.map((d) => d.message).join(", ")
    );
  }

  const { instructors } = value;

  /* =========================
     2. FIND COURSE
  ========================== */
  const course = await CourseSchema.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  /* =========================
     3. PREPARE INSTRUCTORS DATA
     (profileImage via file upload)
  ========================== */
  const preparedInstructors = instructors.map((inst, index) => ({
    name: inst.name,
    bio: inst.bio,
    expertise: inst.expertise,
    profileImage:
      req.files?.profileImages?.[index]?.path || inst.profileImage
  }));

  /* =========================
     4. ADD / REPLACE INSTRUCTORS
  ========================== */
  course.instructors.push(...preparedInstructors);
  course.updatedBy = req.admin._id;

  await course.save();

  /* =========================
     5. RESPONSE
  ========================== */
  return successResponse(res, {
    message: "Instructors added to course successfully",
    data: {
      courseId: course._id,
      instructors: course.instructors
    }
  });
});

const replaceInstructorOfCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  /* =========================
     1. VALIDATE REQUEST BODY
     (oldInstructor + newInstructor)
  ========================== */
  const { error, value } = replaceInstructorValidationSchema.validate(
    req.body,
    { abortEarly: false }
  );

  if (error) {
    throw new ApiError(
      400,
      error.details.map(d => d.message).join(", ")
    );
  }

  const { oldInstructor, newInstructor } = value;

  /* =========================
     2. FIND COURSE
  ========================== */
  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  /* =========================
     3. FIND MATCHING INSTRUCTOR
     (name + expertise match)
  ========================== */
  const instructorIndex = course.instructors.findIndex(inst => {
    if (inst.name !== oldInstructor.name) return false;

    const a = [...(inst.expertise || [])].sort();
    const b = [...(oldInstructor.expertise || [])].sort();

    return JSON.stringify(a) === JSON.stringify(b);
  });

  if (instructorIndex === -1) {
    throw new ApiError(
      404,
      "Old instructor not found in this course"
    );
  }

  /* =========================
     4. PREPARE NEW INSTRUCTOR
     (profileImage from file)
  ========================== */
  const preparedInstructor = {
    name: newInstructor.name,
    bio: newInstructor.bio,
    expertise: newInstructor.expertise,
    profileImage:
      req.file?.path || course.instructors[instructorIndex].profileImage
  };

  /* =========================
     5. REPLACE INSTRUCTOR
  ========================== */
  course.instructors[instructorIndex] = preparedInstructor;
  course.updatedBy = req.admin._id;

  await course.save();

  /* =========================
     6. RESPONSE
  ========================== */
  return successResponse(res, {
    message: "Instructor replaced successfully",
    data: {
      courseId: course._id,
      instructor: preparedInstructor
    }
  });
});






export {createCourse}