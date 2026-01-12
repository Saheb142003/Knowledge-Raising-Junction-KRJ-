import mongoose from "mongoose";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import { Batch } from "../../../Schema/Management/Batch/Batch.Schema.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import { Subject } from "../../../Schema/Management/Subjects/Subject.Schema.js";
import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";
import { Assignment } from "../../../Schema/Management/Assignments/Assignments.Schema.js";
import { Test } from "../../../Schema/Management/Test/Test.Schema.js";
import { RoutineSlot } from "../../../Schema/Management/Routine/Routine.Schema.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";
import Joi from "joi";
import { assignments, mentors,students,subjects, tests } from "../../../Validations/Batch/Batch.Validations.js";
import { Admin } from "../../../Schema/Management/Admin/Admin.Schema.js";

const removableTeachersValidationSchema = Joi.object({
    mentors : mentors.required()
})
const removableStudentsValidationSchema = Joi.object({
    students : students.required()
})
const removableSubjectsValidationSchema = Joi.object({
    subjects : subjects.required()
})
const removableAssignmentsValidationSchema = Joi.object({
    assignments : assignments.required()
})
const removableTestsValidationSchema = Joi.object({
    tests : tests.required()
})


const softDeleteBatch = asyncHandler(async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { batchId } = req.params;
    const adminId = req.user._id;

    /* =========================
       1. FETCH & AUTHORIZE
    ========================== */
    const batch = await Batch.findById(batchId).session(session);
    if (!batch) {
      throw new ApiError(404, "Batch not found");
    }

    if (!batch.managedBy.map(id => id.toString()).includes(adminId.toString())) {
      throw new ApiError(403, "Not authorized to delete this batch");
    }

    if (!batch.isActive) {
      throw new ApiError(400, "Batch already inactive");
    }

    /* =========================
       2. SOFT DELETE BATCH
    ========================== */
    batch.isActive = false;

    batch.subjects = [];
    batch.students = [];
    batch.mentors = [];
    batch.assignments = [];
    batch.tests = [];
    batch.routine = [];

    await batch.save({ session });

    /* =========================
       3. PULL BATCH FROM OTHERS
    ========================== */

    await Subject.updateMany(
      { batches: batchId },
      { $pull: { batches: batchId } },
      { session }
    );

    await Student.updateMany(
      { batches: batchId },
      { $pull: { batches: batchId } },
      { session }
    );

    await Teacher.updateMany(
      { batches: batchId },
      { $pull: { batches: batchId } },
      { session }
    );

    await Assignment.updateMany(
      { batches: batchId },
      { $pull: { batches: batchId } },
      { session }
    );

    await Test.updateMany(
      { batches: batchId },
      { $pull: { batches: batchId } },
      { session }
    );

    await RoutineSlot.updateMany(
      { batches: batchId },
      { $pull: { batches: batchId } },
      { session }
    );

    /* =========================
       4. COMMIT
    ========================== */
    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 200,
      message: "Batch soft-deleted successfully",
      data: {
        batchId,
        isActive: false,
      },
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
const hardDeleteBatch = asyncHandler(async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { batchId } = req.params;
    const adminId = req.user._id;

    /* =========================
       1. FETCH & AUTHORIZE
    ========================== */
    const batch = await Batch.findById(batchId).session(session);
    if (!batch) {
      throw new ApiError(404, "Batch not found");
    }

    if (!batch.managedBy.map(id => id.toString()).includes(adminId.toString())) {
      throw new ApiError(403, "Not authorized to delete this batch");
    }

    /* =========================
       2. HARD DELETE GUARDS
    ========================== */
    if (batch.isActive) {
      throw new ApiError(
        400,
        "Batch must be soft deleted before hard delete"
      );
    }

    if (batch.routine.length > 0) {
      throw new ApiError(
        400,
        "Batch still has routines attached"
      );
    }

    const routineExists = await Routine.exists({
      batches: batchId,
    }).session(session);

    if (routineExists) {
      throw new ApiError(
        400,
        "Cannot hard delete batch: routines still reference this batch"
      );
    }

    /* =========================
       3. DELETE JUNCTION DOCS
    ========================== */
    await Subject.deleteMany({ batch: batchId }).session(session);
    await Assignment.deleteMany({ batch: batchId }).session(session);
    await Test.deleteMany({ batch: batchId }).session(session);

    /* =========================
       4. HARD DELETE BATCH
    ========================== */
    await Batch.deleteOne({ _id: batchId }).session(session);

    /* =========================
       5. COMMIT
    ========================== */
    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 200,
      message: "Batch permanently deleted",
      data: { batchId },
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
 const removeTeacherFromBatch = asyncHandler(async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    /* =========================
       1. VALIDATE BODY
    ========================== */
    const { error, value } =
      removableTeachersValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

    if (error) {
      throw new ApiError(
        400,
        "Validation failed",
        error.details.map(d => ({
          field: d.path.join("."),
          message: d.message,
        }))
      );
    }

    const { mentors } = value;          // array of teacherIds
    const { batchId } = req.params;     // route param
    const adminId = req.user._id;        // auth context

    /* =========================
       2. ADMIN CHECK
    ========================== */
    const admin = await Admin.findById(adminId).session(session);
    if (!admin) {
      throw new ApiError(403, "Invalid admin");
    }

    if (!admin.permissions?.includes("manage_batches")) {
      throw new ApiError(403, "Admin does not have permission to manage batches");
    }

    /* =========================
       3. FETCH BATCH
    ========================== */
    const batch = await Batch.findById(batchId).session(session);
    if (!batch) {
      throw new ApiError(404, "Batch not found");
    }

    if (!batch.isActive) {
      throw new ApiError(400, "Cannot modify an inactive batch");
    }

    const isBatchManager = batch.managedBy
      .map(id => id.toString())
      .includes(adminId.toString());

    if (!isBatchManager) {
      throw new ApiError(403, "Admin is not authorized to manage this batch");
    }

    /* =========================
       4. FILTER TEACHERS
    ========================== */
    const existingTeacherIds = new Set(
      batch.mentors.map(id => id.toString())
    );

    const incomingTeacherIds = mentors.map(id => id.toString());

    const removableTeachers = incomingTeacherIds.filter(id =>
      existingTeacherIds.has(id)
    );

    const skippedTeachers = incomingTeacherIds.filter(
      id => !existingTeacherIds.has(id)
    );

    if (!removableTeachers.length) {
      throw new ApiError(
        400,
        "None of the provided teachers are part of this batch"
      );
    }

    /* =========================
       5. UPDATE BATCH
    ========================== */
    await Batch.updateOne(
      { _id: batchId },
      {
        $pull: { mentors: { $in: removableTeachers } },
        $inc: { currentTeacherCount: -removableTeachers.length },
      },
      { session }
    );

    /* =========================
       6. UPDATE TEACHERS
    ========================== */
    await Teacher.updateMany(
      { _id: { $in: removableTeachers } },
      { $pull: { batches: batchId } },
      { session }
    );

    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 200,
      message: "Teachers removed from batch successfully",
      data: {
        batchId,
        counts: {
          removed: removableTeachers.length,
          skipped: skippedTeachers.length,
        },
      },
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
const removeStudentsFromBatch = asyncHandler(async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    /* =========================
       1. VALIDATE BODY
    ========================== */
    const { error, value } = removableStudentsValidationSchema.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    if (error) {
      throw new ApiError(
        400,
        "Validation failed",
        error.details.map(d => ({
          field: d.path.join("."),
          message: d.message,
        }))
      );
    }

    const { students } = value;          // normalized array
    const { batchId } = req.params;      // route param
    const adminId = req.user._id;         // auth context

    /* =========================
       2. ADMIN CHECK
    ========================== */
    const admin = await Admin.findById(adminId).session(session);
    if (!admin) throw new ApiError(403, "Invalid admin");

    if (!admin.permissions?.includes("manage_batches")) {
      throw new ApiError(403, "Admin cannot manage batches");
    }

    /* =========================
       3. FETCH BATCH
    ========================== */
    const batch = await Batch.findById(batchId).session(session);
    if (!batch) throw new ApiError(404, "Batch not found");

    if (!batch.isActive) {
      throw new ApiError(400, "Cannot modify an inactive batch");
    }

    if (
      !batch.managedBy
        .map(id => id.toString())
        .includes(adminId.toString())
    ) {
      throw new ApiError(403, "Not authorized for this batch");
    }

    /* =========================
       4. FILTER STUDENTS
    ========================== */
    const existingStudentIds = new Set(
      batch.students.map(id => id.toString())
    );

    const incomingStudentIds = students.map(id => id.toString());

    const removableStudents = incomingStudentIds.filter(id =>
      existingStudentIds.has(id)
    );

    const skippedStudents = incomingStudentIds.filter(
      id => !existingStudentIds.has(id)
    );

    if (!removableStudents.length) {
      throw new ApiError(
        400,
        "None of the provided students are part of this batch"
      );
    }

    /* =========================
       5. UPDATE BATCH
    ========================== */
    await Batch.updateOne(
      { _id: batchId },
      {
        $pull: { students: { $in: removableStudents } },
        $inc: { currentStudentCount: -removableStudents.length },
      },
      { session }
    );

    /* =========================
       6. UPDATE STUDENTS
    ========================== */
    await Student.updateMany(
      { _id: { $in: removableStudents } },
      { $pull: { batches: batchId } },
      { session }
    );

    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 200,
      message: "Students removed from batch successfully",
      data: {
        batchId,
        counts: {
          removed: removableStudents.length,
          skipped: skippedStudents.length,
        },
      },
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
const removeSubjectsFromBatch = asyncHandler(async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    /* =========================
       1. VALIDATE BODY
    ========================== */
    const { error, value } = removableSubjectsValidationSchema.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    if (error) {
      throw new ApiError(
        400,
        "Validation failed",
        error.details.map(d => ({
          field: d.path.join("."),
          message: d.message,
        }))
      );
    }

    const { subjects } = value;        // normalized array
    const { batchId } = req.params;    // route param
    const adminId = req.user._id;       // auth context

    /* =========================
       2. ADMIN CHECK
    ========================== */
    const admin = await Admin.findById(adminId).session(session);
    if (!admin) throw new ApiError(403, "Invalid admin");

    if (!admin.permissions?.includes("manage_batches")) {
      throw new ApiError(403, "Admin cannot manage batches");
    }

    /* =========================
       3. FETCH BATCH
    ========================== */
    const batch = await Batch.findById(batchId).session(session);
    if (!batch) throw new ApiError(404, "Batch not found");

    if (!batch.isActive) {
      throw new ApiError(400, "Cannot modify an inactive batch");
    }

    if (
      !batch.managedBy
        .map(id => id.toString())
        .includes(adminId.toString())
    ) {
      throw new ApiError(403, "Not authorized for this batch");
    }

    /* =========================
       4. FILTER SUBJECTS
    ========================== */
    const existingSubjectIds = new Set(
      batch.subjects.map(id => id.toString())
    );

    const incomingSubjectIds = subjects.map(id => id.toString());

    const removableSubjects = incomingSubjectIds.filter(id =>
      existingSubjectIds.has(id)
    );

    const skippedSubjects = incomingSubjectIds.filter(
      id => !existingSubjectIds.has(id)
    );

    if (!removableSubjects.length) {
      throw new ApiError(
        400,
        "None of the provided subjects are part of this batch"
      );
    }

    /* =========================
       5. UPDATE BATCH
    ========================== */
    await Batch.updateOne(
      { _id: batchId },
      {
        $pull: { subjects: { $in: removableSubjects } },
      },
      { session }
    );

    /* =========================
       6. UPDATE SUBJECTS
    ========================== */
    await Subject.updateMany(
      { _id: { $in: removableSubjects } },
      { $pull: { batches: batchId } },
      { session }
    );

    /* =========================
       7. FREE ROUTINES (IMPORTANT)
    ========================== */
    await Routine.updateMany(
      {
        subject: { $in: removableSubjects },
        batches: batchId,
      },
      { $pull: { batches: batchId } },
      { session }
    );

    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 200,
      message: "Subjects removed from batch successfully",
      data: {
        batchId,
        counts: {
          removed: removableSubjects.length,
          skipped: skippedSubjects.length,
        },
      },
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});
const removeAssignmentsFromBatch = asyncHandler(async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    /* 1. VALIDATE BODY */
    const { error, value } =
      removableAssignmentsValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

    if (error) {
      throw new ApiError(
        400,
        "Validation failed",
        error.details.map(d => ({
          field: d.path.join("."),
          message: d.message,
        }))
      );
    }

    const { assignments } = value;
    const { batchId } = req.params;
    const adminId = req.user._id;

    /* 2. ADMIN + BATCH CHECK */
    const admin = await Admin.findById(adminId).session(session);
    if (!admin || !admin.permissions?.includes("manage_batches")) {
      throw new ApiError(403, "Unauthorized");
    }

    const batch = await Batch.findById(batchId).session(session);
    if (!batch || !batch.isActive) {
      throw new ApiError(400, "Invalid or inactive batch");
    }

    if (!batch.managedBy.map(id => id.toString()).includes(adminId.toString())) {
      throw new ApiError(403, "Not authorized for this batch");
    }

    /* 3. FILTER ASSIGNMENTS */
    const existing = new Set(batch.assignments.map(id => id.toString()));
    const incoming = assignments.map(id => id.toString());

    const removable = incoming.filter(id => existing.has(id));
    if (!removable.length) {
      throw new ApiError(400, "No valid assignments to remove");
    }

    /* 4. UPDATE BATCH */
    await Batch.updateOne(
      { _id: batchId },
      { $pull: { assignments: { $in: removable } } },
      { session }
    );

    /* 5. DELETE JUNCTION */
    await Assignment.deleteMany(
      { batch: batchId, assignment: { $in: removable } },
      { session }
    );

    /* 6. PULL BATCH FROM ASSIGNMENTS */
    await Assignment.updateMany(
      { _id: { $in: removable } },
      { $pull: { batches: batchId } },
      { session }
    );

    /* 7. RELEASE SUBJECT & TEACHER IF ORPHAN */
    const orphanAssignments = await Assignment.find(
      { _id: { $in: removable }, batches: { $size: 0 } },
      null,
      { session }
    );

    if (orphanAssignments.length) {
      await Assignment.updateMany(
        { _id: { $in: orphanAssignments.map(a => a._id) } },
        { $unset: { subject: "", createdBy: "" } },
        { session }
      );
    }

    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 200,
      message: "Assignments removed from batch successfully",
      data: {
        batchId,
        removed: removable.length,
        orphaned: orphanAssignments.length,
      },
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});

const removeTestsFromBatch = asyncHandler(async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    /* 1. VALIDATE BODY */
    const { error, value } =
      removableTestsValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

    if (error) {
      throw new ApiError(
        400,
        "Validation failed",
        error.details.map(d => ({
          field: d.path.join("."),
          message: d.message,
        }))
      );
    }

    const { tests } = value;
    const { batchId } = req.params;
    const adminId = req.user._id;

    /* 2. ADMIN + BATCH CHECK */
    const admin = await Admin.findById(adminId).session(session);
    if (!admin || !admin.permissions?.includes("manage_batches")) {
      throw new ApiError(403, "Unauthorized");
    }

    const batch = await Batch.findById(batchId).session(session);
    if (!batch || !batch.isActive) {
      throw new ApiError(400, "Invalid or inactive batch");
    }

    if (!batch.managedBy.map(id => id.toString()).includes(adminId.toString())) {
      throw new ApiError(403, "Not authorized for this batch");
    }

    /* 3. FILTER TESTS */
    const existing = new Set(batch.tests.map(id => id.toString()));
    const incoming = tests.map(id => id.toString());

    const removable = incoming.filter(id => existing.has(id));
    if (!removable.length) {
      throw new ApiError(400, "No valid tests to remove");
    }

    /* 4. UPDATE BATCH */
    await Batch.updateOne(
      { _id: batchId },
      { $pull: { tests: { $in: removable } } },
      { session }
    );

    /* 5. DELETE JUNCTION */
    await Test.deleteMany(
      { batch: batchId, test: { $in: removable } },
      { session }
    );

    /* 6. PULL BATCH FROM TESTS */
    await Test.updateMany(
      { _id: { $in: removable } },
      { $pull: { batches: batchId } },
      { session }
    );

    /* 7. RELEASE SUBJECT & TEACHER IF ORPHAN */
    const orphanTests = await Test.find(
      { _id: { $in: removable }, batches: { $size: 0 } },
      null,
      { session }
    );

    if (orphanTests.length) {
      await Test.updateMany(
        { _id: { $in: orphanTests.map(t => t._id) } },
        { $unset: { subject: "", createdBy: "" } },
        { session }
      );
    }

    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 200,
      message: "Tests removed from batch successfully",
      data: {
        batchId,
        removed: removable.length,
        orphaned: orphanTests.length,
      },
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }
});









export {softDeleteBatch,hardDeleteBatch,removeStudentsFromBatch,removeTeacherFromBatch,removeSubjectsFromBatch,removeTestsFromBatch,removeAssignmentsFromBatch}

