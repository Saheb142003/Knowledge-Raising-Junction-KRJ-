import { asyncHandler } from "../../../../Utility/Response/AsyncHandler.Utility.js";
import Teacher from "../../../../Schema/Management/Teacher/Teacher.Schema.js";
import { Employee } from "../../../../Schema/Management/Employee/Employee.Schema.js";
import { Batch } from "../../../../Schema/Management/Batch/Batch.Schema.js";
import { Subject } from "../../../../Schema/Management/Subjects/Subject.Schema.js";
import { Branch } from "../../../../Schema/Management/Branch/Branch.Schema.js";
import ApiError from "../../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../../Utility/Response/SuccessResponse.Utility.js";
import { checkAdminPermission } from "../Admin.Utils.js";

const assignSubjectsToTeacher = asyncHandler(async (req, res) => {
  const admin = await checkAdminPermission(req.user._id, "manage_teachers");

  const { teacherId } = req.params;
  const { subjects } = req.body; // Array of subject IDs

  if (!subjects || !Array.isArray(subjects)) {
    throw new ApiError(400, "Subjects array is required");
  }

  const teacher = await Teacher.findById(teacherId).populate("employeeId");
  if (!teacher) throw new ApiError(404, "Teacher not found");

  // Branch Access Check
  if (admin.role !== "super_admin") {
    const teacherBranches = teacher.employeeId?.branches?.map((b) =>
      b.toString(),
    );
    const hasAccess = teacherBranches?.some((tb) =>
      admin.managedBranches.some((mb) => mb.toString() === tb),
    );
    if (!hasAccess) {
      throw new ApiError(403, "Access denied. You do not manage this teacher.");
    }
  }

  // Validate Subjects
  const validSubjects = await Subject.countDocuments({
    _id: { $in: subjects },
  });
  if (validSubjects !== subjects.length) {
    throw new ApiError(400, "One or more invalid subject IDs");
  }

  teacher.subjects = subjects;
  await teacher.save();

  return successResponse(res, {
    message: "Subjects assigned successfully",
    data: teacher.subjects,
  });
});

const assignBatchesToTeacher = asyncHandler(async (req, res) => {
  const admin = await checkAdminPermission(req.user._id, "manage_teachers");

  const { teacherId } = req.params;
  const { batches } = req.body; // Array of batch IDs

  if (!batches || !Array.isArray(batches)) {
    throw new ApiError(400, "Batches array is required");
  }

  const teacher = await Teacher.findById(teacherId).populate("employeeId");
  if (!teacher) throw new ApiError(404, "Teacher not found");

  // Branch Access Check (Teacher)
  if (admin.role !== "super_admin") {
    const teacherBranches = teacher.employeeId?.branches?.map((b) =>
      b.toString(),
    );
    const hasAccess = teacherBranches?.some((tb) =>
      admin.managedBranches.some((mb) => mb.toString() === tb),
    );
    if (!hasAccess) {
      throw new ApiError(403, "Access denied. You do not manage this teacher.");
    }
  }

  // Validate Batches and Check Branch Access for Batches
  const batchDocs = await Batch.find({ _id: { $in: batches } });
  if (batchDocs.length !== batches.length) {
    throw new ApiError(400, "One or more invalid batch IDs");
  }

  // Ensure admin manages the branches of these batches
  if (admin.role !== "super_admin") {
    const invalidBatch = batchDocs.find(
      (batch) =>
        !admin.managedBranches.some(
          (mb) => mb.toString() === batch.branch.toString(),
        ),
    );
    if (invalidBatch) {
      throw new ApiError(
        403,
        `Access denied. You do not manage the branch for batch: ${invalidBatch.name}`,
      );
    }
  }

  teacher.batches = batches;
  await teacher.save();

  return successResponse(res, {
    message: "Batches assigned successfully",
    data: teacher.batches,
  });
});

const assignBranchesToTeacher = asyncHandler(async (req, res) => {
  const admin = await checkAdminPermission(req.user._id, "manage_teachers");

  const { teacherId } = req.params;
  const { branches } = req.body; // Array of branch IDs

  if (!branches || !Array.isArray(branches)) {
    throw new ApiError(400, "Branches array is required");
  }

  const teacher = await Teacher.findById(teacherId).populate("employeeId");
  if (!teacher) throw new ApiError(404, "Teacher not found");
  if (!teacher.employeeId)
    throw new ApiError(404, "Teacher employee record not found");

  const currentBranches = teacher.employeeId.branches.map((b) => b.toString());

  // Branch Access Check
  if (admin.role !== "super_admin") {
    // 1. Must manage ALL current branches to modify them
    const manageAllCurrent = currentBranches.every((cb) =>
      admin.managedBranches.some((mb) => mb.toString() === cb),
    );
    if (!manageAllCurrent) {
      throw new ApiError(
        403,
        "Access denied. You cannot modify branches for a teacher who belongs to branches you do not manage.",
      );
    }

    // 2. Must manage ALL new branches to assign them
    const manageAllNew = branches.every((nb) =>
      admin.managedBranches.some((mb) => mb.toString() === nb),
    );
    if (!manageAllNew) {
      throw new ApiError(
        403,
        "Access denied. You are trying to assign a branch you do not manage.",
      );
    }
  }

  // Logic to sync Branch models
  const branchesToRemove = currentBranches.filter((b) => !branches.includes(b));
  const branchesToAdd = branches.filter((b) => !currentBranches.includes(b));

  // Update Employee
  await Employee.findByIdAndUpdate(teacher.employeeId._id, {
    branches: branches,
  });

  // Remove employee from old branches
  if (branchesToRemove.length > 0) {
    await Branch.updateMany(
      { _id: { $in: branchesToRemove } },
      { $pull: { employees: teacher.employeeId._id } },
    );
  }

  // Add employee to new branches
  if (branchesToAdd.length > 0) {
    await Branch.updateMany(
      { _id: { $in: branchesToAdd } },
      { $addToSet: { employees: teacher.employeeId._id } },
    );
  }

  return successResponse(res, {
    message: "Branches assigned successfully",
    data: branches,
  });
});

export {
  assignSubjectsToTeacher,
  assignBatchesToTeacher,
  assignBranchesToTeacher,
};
