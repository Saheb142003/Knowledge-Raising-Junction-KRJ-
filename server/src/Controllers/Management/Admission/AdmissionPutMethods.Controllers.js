import mongoose from "mongoose";
import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { Branch } from "../../../Schema/Management/Branch/Branch.Schema.js";
import { Teacher } from "../../../Schema/Management/Teacher/Teacher.Schema.js";
import { AcademicProfile } from "../../../Schema/Management/AcademicDetails/AcademicProfile.Schema.js";
import { IDCard } from "../../../Schema/Management/IDCard/IDCard.Schema.js";


// ================================
// JOI VALIDATION SCHEMA
// ================================
const studentUpdateValidationSchema = Joi.object({
  fatherName: Joi.string().min(2).optional(),
  motherName: Joi.string().min(2).optional(),
  bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  dob: Joi.date().optional(),
  address: Joi.string().optional(),

  contact: Joi.object({
    whatsapp: Joi.string().optional(),
    parentMobile: Joi.string().optional(),
  }).optional(),

  branch: Joi.string().length(24).optional(),
  assignedTeacher: Joi.array().items(Joi.string().length(24)).optional(),

  joiningDate: Joi.date().optional(),
  leavingDate: Joi.date().optional(),

  status: Joi.string().valid("ACTIVE", "LEFT", "INACTIVE").optional(),

  // academic profile update fields
  academicYear: Joi.string().optional(),
  currentClassYear: Joi.string().optional(),
  board: Joi.string().optional(),
  course: Joi.string().optional(),
  medium: Joi.string().optional(),

  previousAcademics: Joi.array().optional(),
  remarks: Joi.string().allow("").optional(),
});


// ================================
// CONTROLLER
// ================================
const updateStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) throw new ApiError(400, "Student ID is required");

  // Validate input
  const { error, value } = studentUpdateValidationSchema.validate(req.body, {
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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const student = await Student.findOne({ _id: studentId, isDeleted: false }).session(session);
    if (!student) throw new ApiError(404, "Student not found");

    const oldBranchId = student.branch?.toString();
    const newBranchId = value.branch?.toString();

    // --------------------------
    // Validate Branch if changed
    // --------------------------
    if (newBranchId && newBranchId !== oldBranchId) {
      const branchExists = await Branch.findById(newBranchId).session(session);
      if (!branchExists) throw new ApiError(404, "Branch not found");
    }

    // --------------------------
    // Validate Assigned Teachers
    // --------------------------
    if (value.assignedTeacher) {
      const validTeachers = await Teacher.countDocuments({
        _id: { $in: value.assignedTeacher },
      });

      if (validTeachers !== value.assignedTeacher.length) {
        throw new ApiError(400, "One or more teachers not found");
      }
    }

    // --------------------------
    // Deep merge CONTACT
    // --------------------------
    if (value.contact) {
      student.contact = {
        ...(student.contact || {}),
        ...value.contact,
      };
    }

    // --------------------------
    // Update Academic Profile also
    // --------------------------
    const academicFields = [
      "academicYear",
      "currentClassYear",
      "board",
      "course",
      "medium",
      "previousAcademics",
      "remarks",
    ];

    const academicUpdate = {};
    academicFields.forEach((key) => {
      if (value[key] !== undefined) academicUpdate[key] = value[key];
    });

    if (Object.keys(academicUpdate).length > 0 && student.academicProfile) {
      await AcademicProfile.updateOne(
        { _id: student.academicProfile },
        { $set: academicUpdate },
        { session }
      );
    }

    // Remove academic fields from student update object
    academicFields.forEach((key) => delete value[key]);

    // --------------------------
    // Merge remaining fields
    // --------------------------
    Object.assign(student, value);

    await student.save({ session });

    // --------------------------
    // Branch transition handling
    // --------------------------
    if (newBranchId && newBranchId !== oldBranchId) {
      if (oldBranchId) {
        await Branch.updateOne(
          { _id: oldBranchId },
          { $pull: { students: student._id } },
          { session }
        );
      }

      await Branch.updateOne(
        { _id: newBranchId },
        { $addToSet: { students: student._id } },
        { session }
      );

      // Update IDCard branch also
      if (student.idCard) {
        await IDCard.updateOne(
          { _id: student.idCard },
          { $set: { branch: newBranchId } },
          { session }
        );
      }
    }

    await session.commitTransaction();

    const result = student.toObject();
    delete result.password;
    delete result.__v;

    return successResponse(res, {
      message: "Student updated successfully",
      data: result,
    });
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
});

export default updateStudent;
