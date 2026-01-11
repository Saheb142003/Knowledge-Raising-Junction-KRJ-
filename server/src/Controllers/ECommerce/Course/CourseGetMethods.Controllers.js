import mongoose from "mongoose";
import CourseSchema from "../../../Schema/ECommerce/Course/Course.Schema";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility";

const getAllCourses = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  /* =========================
     1. VALIDATE STATUS
  ========================== */
  const allowedStatus = ["DRAFT", "PUBLISHED", "ARCHIVED"];

  if (status && !allowedStatus.includes(status)) {
    throw new ApiError(
      400,
      "Invalid status. Allowed values: DRAFT, PUBLISHED, ARCHIVED"
    );
  }

  /* =========================
     2. BUILD QUERY
  ========================== */
  const filter = {};

  if (status) {
    filter.status = status;
  }

  /* =========================
     3. PAGINATION SETUP
  ========================== */
  const pageNumber = Math.max(parseInt(page, 10), 1);
  const pageSize = Math.max(parseInt(limit, 10), 1);
  const skip = (pageNumber - 1) * pageSize;

  /* =========================
     4. FETCH DATA + COUNT
  ========================== */
  const [courses, totalCount] = await Promise.all([
    CourseSchema.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize),
    CourseSchema.countDocuments(filter)
  ]);

  /* =========================
     5. RESPONSE
  ========================== */
  return successResponse(res, {
    message: "Courses fetched successfully",
    data: courses,
    pagination: {
      totalItems: totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / pageSize),
      pageSize
    }
  });
});


const getAllInstructorsDetail = asyncHandler(async (req, res) => {
  /* =========================
     0. PAGINATION PARAMS
  ========================== */
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  /* =========================
     1. FETCH ALL INSTRUCTORS
     (from embedded array)
  ========================== */
  const courses = await CourseSchema.find(
    { instructors: { $exists: true, $ne: [] } },
    { instructors: 1 }
  );

  /* =========================
     2. FLATTEN & NORMALIZE
     (DEDUPLICATION)
  ========================== */
  const instructorMap = new Map();

  courses.forEach(course => {
    course.instructors.forEach(inst => {
      const key = `${inst.name}-${(inst.expertise || []).sort().join(",")}`;

      if (!instructorMap.has(key)) {
        instructorMap.set(key, {
          name: inst.name,
          bio: inst.bio,
          expertise: inst.expertise || [],
          profileImage: inst.profileImage
        });
      }
    });
  });

  /* =========================
     3. APPLY PAGINATION
  ========================== */
  const instructorsArray = Array.from(instructorMap.values());
  const total = instructorsArray.length;

  const paginatedInstructors = instructorsArray.slice(
    skip,
    skip + limit
  );

  /* =========================
     4. RESPONSE
  ========================== */
  return successResponse(res, {
    message: "All instructors fetched successfully",
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    },
    data: paginatedInstructors
  });
});

const getAllCoursesViaQuery = asyncHandler(async (req, res) => {
  const {
    status,
    category,
    level,
    language,
    isFree,
    minPrice,
    maxPrice,
    search,
    page = 1,
    limit = 10
  } = req.query;

  /* =========================
     1. BUILD FILTER
  ========================== */
  const filter = { isActive: true };

  if (status) filter.status = status;
  if (category) filter.category = category;
  if (level) filter.level = level;
  if (language) filter.language = language;
  if (isFree !== undefined) filter.isFree = isFree === "true";

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  /* =========================
     2. PAGINATION
  ========================== */
  const pageNumber = Math.max(parseInt(page, 10), 1);
  const pageSize = Math.max(parseInt(limit, 10), 1);
  const skip = (pageNumber - 1) * pageSize;

  /* =========================
     3. QUERY
  ========================== */
  const [courses, totalCount] = await Promise.all([
    CourseSchema.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .select("-description -seo"), // optional optimization
    Course.countDocuments(filter)
  ]);

  /* =========================
     4. RESPONSE
  ========================== */
  return successResponse(res, {
    message: "Courses fetched successfully",
    data: courses,
    pagination: {
      totalItems: totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / pageSize),
      pageSize
    }
  });
});

const getCourseBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const course = await CourseSchema.findOne({
    slug,
    status: "PUBLISHED",
    isActive: true
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return successResponse(res, {
    message: "Course fetched successfully",
    data: course
  });
});

const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid course ID");
  }

  const course = await CourseSchema.findById(id);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return successResponse(res, {
    message: "Course fetched successfully",
    data: course
  });
});


// For landing page + general purpose

const getCoursesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const courses = await CourseSchema.find({
    category,
    status: "PUBLISHED",
    isActive: true
  }).sort({ createdAt: -1 });

  return successResponse(res, {
    message: "Courses fetched successfully",
    data: courses
  });
});

const getFreeCourses = asyncHandler(async (req, res) => {
  const courses = await CourseSchema.find({
    isFree: true,
    status: "PUBLISHED",
    isActive: true
  }).sort({ createdAt: -1 });

  return successResponse(res, {
    message: "Free courses fetched successfully",
    data: courses
  });
});

const getPopularCourses = asyncHandler(async (req, res) => {
  const courses = await CourseSchema.find({
    status: "PUBLISHED",
    isActive: true
  })
    .sort({ totalEnrollments: -1, averageRating: -1 })
    .limit(10);

  return successResponse(res, {
    message: "Popular courses fetched successfully",
    data: courses
  });
});

const searchCourses = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    throw new ApiError(400, "Search query is required");
  }

  const courses = await CourseSchema.find({
    status: "PUBLISHED",
    isActive: true,
    $or: [
      { title: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } }
    ]
  });

  return successResponse(res, {
    message: "Search results fetched",
    data: courses
  });
});

const getCoursesByInstructor = asyncHandler(async (req, res) => {
  const { name } = req.params;

  const courses = await CourseSchema.find({
    "instructors.name": { $regex: name, $options: "i" },
    status: "PUBLISHED",
    isActive: true
  });

  return successResponse(res, {
    message: "Courses fetched successfully",
    data: courses
  });
});

const getLatestCourses = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const pageSize = Math.max(parseInt(limit, 10), 1);

  const courses = await CourseSchema.find({
    status: "PUBLISHED",
    isActive: true
  })
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(pageSize)
    .select(
      "title slug shortDescription thumbnailUrl price discountPrice isFree averageRating totalEnrollments publishedAt"
    );

  return successResponse(res, {
    message: "Latest courses fetched successfully",
    data: courses
  });
});


export {getAllCourses,getAllCoursesViaQuery,getAllInstructorsDetail,getCourseById,getCourseBySlug,getCoursesByCategory,getCoursesByInstructor,getFreeCourses,getLatestCourses,getPopularCourses,searchCourses}



