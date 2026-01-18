import mongoose from "mongoose";
import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { Branch } from "../../../Schema/Management/Branch/Branch.Schema.js";
import { AcademicProfile } from "../../../Schema/Management/AcademicDetails/AcademicProfile.Schema.js";
import { IDCard } from "../../../Schema/Management/IDCard/IDCard.Schema.js";
import Teacher from "../../../Schema/Management/Teacher/Teacher.Schema.js";


/* ===========================
   PARAM VALIDATION
=========================== */
const studentIdParamSchema = Joi.object({
  studentId: Joi.string().length(24).required(),
});


/* ===========================
   DELETE / SOFT DELETE STUDENT
=========================== */
const deleteStudent = asyncHandler(async (req, res) => {
  const { error } = studentIdParamSchema.validate(req.params);
  if (error) throw new ApiError(400, "Invalid student ID");

  const { studentId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const student = await Student.findOne({ _id: studentId }).session(session);
    if (!student) throw new ApiError(404, "Student not found");

    // Prevent double delete
    if (student.isDeleted === true) {
      throw new ApiError(400, "Student already deleted");
    }

    const branchId = student.branch;
    const idCardId = student.idCard;
    const academicProfileId = student.academicProfile;

    // ==============================
    // 1️⃣ Branch → remove student
    // ==============================
    if (branchId) {
      await Branch.updateOne(
        { _id: branchId },
        { $pull: { students: student._id } },
        { session }
      );
    }

    // ==============================
    // 2️⃣ Teacher → unassign student
    // ==============================
    if (student.assignedTeacher?.length > 0) {
      await Teacher.updateMany(
        { _id: { $in: student.assignedTeacher } },
        { $pull: { students: student._id } },
        { session }
      );
    }

    // ==============================
    // 3️⃣ Deactivate ID Card
    // ==============================
    if (idCardId) {
      await IDCard.updateOne(
        { _id: idCardId },
        { status: "SUSPENDED", updatedAt: new Date() },
        { session }
      );
    }

    // ==============================
    // 4️⃣ Deactivate Academic Profile
    // ==============================
    if (academicProfileId) {
      await AcademicProfile.updateOne(
        { _id: academicProfileId },
        { isActive: false, updatedAt: new Date() },
        { session }
      );
    }

    // ==============================
    // 5️⃣ Soft Delete Student
    // ==============================
    student.status = "INACTIVE";
    student.leavingDate = new Date();
    student.isDeleted = true;
    student.deletedAt = new Date();
    student.deletedBy = req.user?._id || null; // optional based on your auth structure

    await student.save({ session });

    await session.commitTransaction();

    return successResponse(res, {
      message: "Student deleted successfully (soft delete)",
      data: {
        studentId,
        status: student.status,
        deletedAt: student.deletedAt,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
});

export default deleteStudent;
