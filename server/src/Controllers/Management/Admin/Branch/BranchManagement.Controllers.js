import Joi from "joi";
import mongoose from "mongoose";
import { asyncHandler } from "../../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../../Utility/Response/SuccessResponse.Utility.js";
import {
  address,
  areaCode,
  batches,
  employees,
  isActive,
  managedBy,
  name,
  objectId,
  students,
} from "../../../../Validations/Branch/Branch.Validations.js";
import { Admin } from "../../../../Schema/Management/Admin/Admin.Schema.js";
import { Branch } from "../../../../Schema/Management/Branch/Branch.Schema.js";
import { Student } from "../../../../Schema/Management/Student/Student.Schema.js";
import { Employee } from "../../../../Schema/Management/Employee/Employee.Schema.js";
import { Batch } from "../../../../Schema/Management/Batch/Batch.Schema.js";
import CounterSchema from "../../../../Schema/Management/Counter/Counter.Schema.js";

const branchCreationValidationSchema = Joi.object({
  name: name.required(),
  address: address.required(),
  batches: batches.optional(),
  students: students.optional(),
  employees: employees.optional(),
  managedBy: managedBy.optional(),
  createdBy: objectId.required(),
  isActive: isActive.optional(),
  areaCode: areaCode.required(),
});

const assignAdminValidationSchema = Joi.object({
  adminIds: Joi.array().items(objectId).required(),
});

const createBranch = asyncHandler(async (req, res) => {
  let session;

  try {
    const { error, value } = branchCreationValidationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new ApiError(
        400,
        "Validation failed",
        error.details.map((d) => ({
          field: d.path.join("."),
          message: d.message,
        })),
      );
    }

    const {
      name,
      address,
      batches = [],
      students = [],
      employees = [],
      managedBy,
      createdBy,
      isActive,
      areaCode,
    } = value;

    const startYear = new Date().getFullYear();

    session = await mongoose.startSession();
    session.startTransaction();

    const counter = await CounterSchema.findOneAndUpdate(
      { key: `BRANCH_${startYear}_${areaCode}` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, session },
    );

    const branchCode = `KRJ-${startYear}-${areaCode}-${String(
      counter.seq,
    ).padStart(2, "0")}`;

    const finalManagedBy = [createdBy, ...(managedBy || [])].map((id) =>
      id.toString(),
    );

    const uniqueManagedBy = [...new Set(finalManagedBy)];

    const [branch] = await Branch.create(
      [
        {
          name,
          address,
          branchCode,
          batches,
          students,
          employees,
          managedBy: uniqueManagedBy,
          createdBy,
          isActive,
        },
      ],
      { session },
    );

    if (students.length) {
      await Student.updateMany(
        { _id: { $in: students } },
        { $addToSet: { branches: branch._id } },
        { session },
      );
    }

    if (employees.length) {
      await Employee.updateMany(
        { _id: { $in: employees } },
        { $addToSet: { branches: branch._id } },
        { session },
      );
    }

    if (batches.length) {
      await Batch.updateMany(
        { _id: { $in: batches } },
        { $set: { branch: branch._id } },
        { session },
      );
    }

    await Admin.updateOne(
      { _id: createdBy },
      {
        $addToSet: {
          createdBranches: branch._id,
          managedBranches: branch._id,
        },
      },
      { session },
    );

    const managedAdmins = (managedBy || [])
      .map((id) => id.toString())
      .filter((id) => id !== createdBy.toString());

    if (managedAdmins.length) {
      await Admin.updateMany(
        { _id: { $in: managedAdmins } },
        {
          $addToSet: {
            managedBranches: branch._id,
          },
        },
        { session },
      );
    }

    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 201,
      message: "Branch created successfully",
      data: {
        branchId: branch._id,
        branchCode: branch.branchCode,
        name: branch.name,
        address: branch.address,
        totalStudents: students.length,
        totalBatches: batches.length,
        totalEmployees: employees.length,
        isActive: branch.isActive,
      },
    });
  } catch (error) {
    if (session) await session.abortTransaction();
    throw error;
  } finally {
    if (session) session.endSession();
  }
});

const deleteBranch = asyncHandler(async (req, res) => {
  const { branchId } = req.params;

  const { error } = objectId.required().validate(branchId);
  if (error) throw new ApiError(400, "Invalid Branch ID");

  // Only Super Admin can delete
  if (req.user.role !== "SUPER_ADMIN") {
    throw new ApiError(403, "Only Super Admin can delete branches");
  }

  const branch = await Branch.findById(branchId);
  if (!branch) {
    throw new ApiError(404, "Branch not found");
  }

  // Soft delete
  branch.isDeleted = true;
  branch.isActive = false;
  branch.deletedAt = new Date();
  branch.deletedBy = req.user.adminId;

  await branch.save();

  return successResponse(res, {
    message: "Branch deleted successfully",
  });
});

const assignBranchAdmin = asyncHandler(async (req, res) => {
  const { branchId } = req.params;

  const { error: idError } = objectId.required().validate(branchId);
  if (idError) throw new ApiError(400, "Invalid Branch ID");

  const { error, value } = assignAdminValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      })),
    );
  }

  const { adminIds } = value;
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const branch = await Branch.findById(branchId).session(session);
    if (!branch) {
      throw new ApiError(404, "Branch not found");
    }

    // Update Branch managedBy
    await Branch.updateOne(
      { _id: branchId },
      { $addToSet: { managedBy: { $each: adminIds } } },
      { session },
    );

    // Update Admins managedBranches
    await Admin.updateMany(
      { _id: { $in: adminIds } },
      { $addToSet: { managedBranches: branchId } },
      { session },
    );

    await session.commitTransaction();

    return successResponse(res, {
      message: "Admins assigned to branch successfully",
      data: {
        branchId,
        assignedAdmins: adminIds,
      },
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});

export { createBranch, deleteBranch, assignBranchAdmin };
