import { asyncHandler } from "../../../../Utility/Response/AsyncHandler.Utility.js";
import Teacher from "../../../../Schema/Management/Teacher/Teacher.Schema.js";
import successResponse from "../../../../Utility/Response/SuccessResponse.Utility.js";
import { checkAdminPermission } from "../Admin.Utils.js";

const getAllTeachers = asyncHandler(async (req, res) => {
  const admin = await checkAdminPermission(req.user._id, "manage_teachers");

  const { page = 1, limit = 10, search } = req.query;

  const pipeline = [];

  // 1. Match non-deleted teachers
  pipeline.push({
    $match: {
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    },
  });

  // 2. Lookup Employee details to check branches
  pipeline.push({
    $lookup: {
      from: "employees",
      localField: "employeeId",
      foreignField: "_id",
      as: "employeeDetails",
    },
  });
  pipeline.push({ $unwind: "$employeeDetails" });

  // 3. Lookup User details for search
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
    },
  });
  pipeline.push({ $unwind: "$userDetails" });

  // 4. Branch Filtering
  if (admin.role !== "super_admin") {
    pipeline.push({
      $match: {
        "employeeDetails.branches": { $in: admin.managedBranches },
      },
    });
  }

  // 5. Search Filter
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { "userDetails.fullName": { $regex: search, $options: "i" } },
          { "userDetails.email": { $regex: search, $options: "i" } },
          { "employeeDetails.employeeCode": { $regex: search, $options: "i" } },
        ],
      },
    });
  }

  // 6. Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Count total before pagination
  const countPipeline = [...pipeline, { $count: "total" }];
  const totalDocs = await Teacher.aggregate(countPipeline);
  const total = totalDocs.length > 0 ? totalDocs[0].total : 0;

  // Apply sort and pagination
  pipeline.push({ $sort: { createdAt: -1 } });
  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: parseInt(limit) });

  // 7. Project/Lookup for final output (Populate branches names)
  pipeline.push({
    $lookup: {
      from: "branches",
      localField: "employeeDetails.branches",
      foreignField: "_id",
      as: "branchDetails",
    },
  });

  pipeline.push({
    $project: {
      _id: 1,
      experience: 1,
      subjects: 1,
      "userDetails.fullName": 1,
      "userDetails.email": 1,
      "userDetails.phone": 1,
      "employeeDetails.employeeCode": 1,
      "employeeDetails.designation": 1,
      "employeeDetails.department": 1,
      "branchDetails.name": 1,
      "branchDetails.branchCode": 1,
    },
  });

  const teachers = await Teacher.aggregate(pipeline);

  return successResponse(res, {
    message: "Teachers fetched successfully",
    data: {
      teachers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    },
  });
});

export { getAllTeachers };
