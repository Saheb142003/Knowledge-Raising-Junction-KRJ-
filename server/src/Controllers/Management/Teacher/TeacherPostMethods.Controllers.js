import mongoose from "mongoose";
import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { User } from "../../../Schema/Management/User/User.Schema.js";
import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";
import { Branch } from "../../../Schema/Management/Branch/Branch.Schema.js";
import { Batch } from "../../../Schema/Management/Batch/Batch.Schema.js";
import { Subject } from "../../../Schema/Management/Subjects/Subject.Schema.js";
import { Admin } from "../../../Schema/Management/Admin/Admin.Schema.js";

/* =======================================================
   VALIDATION
======================================================= */
const teacherCreateValidationSchema = Joi.object({
  userId: Joi.string().length(24).required(),
  employeeId: Joi.string().optional(),
  qualifications: Joi.string().optional(),
  specialization: Joi.string().optional(),

  branches: Joi.array().items(Joi.string().length(24)).default([]),
  batches: Joi.array().items(Joi.string().length(24)).default([]),
  subjects: Joi.array().items(Joi.string().length(24)).default([]),

  createdBy: Joi.string().length(24).required(),
});

/* =======================================================
   CREATE TEACHER
======================================================= */
export const createTeacher = asyncHandler(async (req, res) => {
  let session;

  try {
    // 1️⃣ Validate Input
    const { error, value } = teacherCreateValidationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error)
      throw new ApiError(
        400,
        "Validation failed",
        error.details.map((d) => ({
          field: d.path.join("."),
          message: d.message,
        }))
      );

    const {
      userId,
      employeeId,
      qualifications,
      specialization,
      branches,
      batches,
      subjects,
      createdBy,
    } = value;

    // 2️⃣ Start Session
    session = await mongoose.startSession();
    session.startTransaction();

    // 3️⃣ Validate Admin Permissions
    const admin = await Admin.findById(createdBy).session(session);
    if (!admin) throw new ApiError(403, "Invalid admin");

    if (!admin.permissions?.includes("manage_teachers")) {
      throw new ApiError(403, "Admin does not have permission to manage teachers");
    }

    // 4️⃣ Validate User
    const user = await User.findById(userId).session(session);
    if (!user) throw new ApiError(404, "User not found");

    // Check if already teacher
    const existingTeacher = await Teacher.findOne({ userId }).session(session);
    if (existingTeacher) {
      throw new ApiError(409, "This user is already registered as a teacher");
    }

    // 5️⃣ Validate Branches
    if (branches.length > 0) {
      const validBranches = await Branch.countDocuments({
        _id: { $in: branches },
      }).session(session);

      if (validBranches !== branches.length) {
        throw new ApiError(400, "Some branches are invalid");
      }
    }

    // 6️⃣ Validate Batches
    if (batches.length > 0) {
      const validBatches = await Batch.countDocuments({
        _id: { $in: batches },
      }).session(session);

      if (validBatches !== batches.length) {
        throw new ApiError(400, "Some batches are invalid");
      }
    }

    // 7️⃣ Validate Subjects
    if (subjects.length > 0) {
      const validSubjects = await Subject.countDocuments({
        _id: { $in: subjects },
      }).session(session);

      if (validSubjects !== subjects.length) {
        throw new ApiError(400, "Some subjects are invalid");
      }
    }

    // 8️⃣ Create Teacher
    const teacherDocs = await Teacher.create(
      [
        {
          userId,
          employeeId: employeeId || null,
          qualifications: qualifications || "",
          specialization: specialization || "",
          branches,
          batches,
          subjects,
          createdBy,
          isDeleted: false,
        },
      ],
      { session }
    );

    const teacher = teacherDocs[0];
    if (!teacher) throw new ApiError(500, "Teacher creation failed");

    // 9️⃣ Update Relations
    if (batches.length) {
      await Batch.updateMany(
        { _id: { $in: batches } },
        { $addToSet: { mentors: teacher._id } },
        { session }
      );
    }

    if (subjects.length) {
      await Subject.updateMany(
        { _id: { $in: subjects } },
        { $addToSet: { teachers: teacher._id } },
        { session }
      );
    }

    // 1️⃣0️⃣ Commit Transaction
    await session.commitTransaction();

    // 1️⃣1️⃣ Populate Final Output
    const result = await Teacher.findById(teacher._id)
      .populate("userId", "fullName email phone")
      .populate("branches", "name branchCode")
      .populate("batches", "name code")
      .populate("subjects", "name code")
      .populate("createdBy", "fullName email")
      .lean();

    return successResponse(res, {
      statusCode: 201,
      message: "Teacher created successfully",
      data: result,
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});

export default createTeacher;
