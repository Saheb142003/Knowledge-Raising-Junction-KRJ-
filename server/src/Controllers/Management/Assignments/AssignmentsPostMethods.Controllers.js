import mongoose from "mongoose";
import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Assignment } from "../../../Schema/Management/Assignments/Assignments.Schema.js";
import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";
import { Batch } from "../../../Schema/Management/Batch/Batch.Schema.js";
import { Subject } from "../../../Schema/Management/Subjects/Subject.Schema.js";

/* ============================
   VALIDATION SCHEMA
============================ */
const assignmentCreateValidation = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().allow(""),

  batches: Joi.array().items(Joi.string().length(24)).min(1).required(),
  subject: Joi.string().length(24).required(),

  createdBy: Joi.string().length(24).required(),

  dueDate: Joi.date().required(),
  maxMarks: Joi.number().min(1).default(100),

  fileUrl: Joi.string().uri().allow(""),
});

/* ============================
   CREATE ASSIGNMENT
============================ */
export const createAssignment = asyncHandler(async (req, res) => {
  let session;

  try {
    // 1️⃣ Validate body
    const { error, value } = assignmentCreateValidation.validate(req.body, {
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
        }))
      );
    }

    const {
      title,
      description,
      batches,
      subject,
      createdBy,
      dueDate,
      maxMarks,
      fileUrl,
    } = value;

    // 2️⃣ Start DB transaction
    session = await mongoose.startSession();
    session.startTransaction();

    /* ======================================
       3️⃣ Validate Teacher
    ====================================== */
    const teacher = await Teacher.findById(createdBy).session(session);
    if (!teacher) throw new ApiError(404, "Teacher not found");

    /* ======================================
       4️⃣ Validate Subject
    ====================================== */
    const subjectDoc = await Subject.findById(subject).session(session);
    if (!subjectDoc) throw new ApiError(404, "Subject not found");

    // Teacher must teach this subject
    if (!teacher.subjects?.includes(subject)) {
      throw new ApiError(
        403,
        "Teacher is not assigned to teach this subject"
      );
    }

    /* ======================================
       5️⃣ Validate Batches
    ====================================== */
    const batchDocs = await Batch.find({ _id: { $in: batches } }).session(
      session
    );
    if (batchDocs.length !== batches.length) {
      throw new ApiError(400, "Some batches are invalid");
    }

    // Each batch must contain this subject
    const invalidBatch = batchDocs.find(
      (b) => !b.subjects?.includes(subject)
    );
    if (invalidBatch) {
      throw new ApiError(
        400,
        `Batch ${invalidBatch.name} does not have this subject`
      );
    }

    /* ======================================
       6️⃣ Prevent Duplicate Assignment
    ====================================== */
    const duplicate = await Assignment.findOne({
      title,
      subject,
      createdBy,
      batches: { $in: batches },
      isDeleted: false,
    }).session(session);

    if (duplicate) {
      throw new ApiError(409, "Similar assignment already exists");
    }

    /* ======================================
       7️⃣ Create Assignment
    ====================================== */
    const [assignment] = await Assignment.create(
      [
        {
          title,
          description,
          batches,
          subject,
          createdBy,
          dueDate,
          maxMarks,
          fileUrl: fileUrl || "",
          isDeleted: false,
        },
      ],
      { session }
    );

    if (!assignment) {
      throw new ApiError(500, "Failed to create assignment");
    }

    /* ======================================
       8️⃣ Add to Teacher.assignments
    ====================================== */
    await Teacher.updateOne(
      { _id: createdBy },
      { $addToSet: { assignments: assignment._id } },
      { session }
    );

    /* ======================================
       9️⃣ Add to Subject.assignments
    ====================================== */
    await Subject.updateOne(
      { _id: subject },
      { $addToSet: { assignments: assignment._id } },
      { session }
    );

    /* ======================================
       🔟 Add to Batches.assignments
    ====================================== */
    await Batch.updateMany(
      { _id: { $in: batches } },
      { $addToSet: { assignments: assignment._id } },
      { session }
    );

    /* ======================================
       1️⃣1️⃣ Commit Transaction
    ====================================== */
    await session.commitTransaction();

    const result = assignment.toObject ? assignment.toObject() : assignment;
    delete result.__v;

    return successResponse(res, {
      statusCode: 201,
      message: "Assignment created successfully",
      data: result,
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
