import mongoose from "mongoose";
import Joi from "joi";
import bcrypt from "bcryptjs";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Student } from "../../../Schema/Management/Student/Student.Schema.js";
import { AcademicProfile } from "../../../Schema/Management/AcademicDetails/AcademicProfile.Schema.js";
import { IDCard } from "../../../Schema/Management/IDCard/IDCard.Schema.js";
import { Branch } from "../../../Schema/Management/Branch/Branch.Schema.js";
import CounterSchema from "../../../Schema/Management/Counter/Counter.Schema.js";
import { Admin } from "../../../Schema/Management/Admin/Admin.Schema.js";
import { User } from "../../../Schema/Management/User/User.Schema.js";

/* =======================
   JOI VALIDATION
======================= */
const admissionCreationValidationSchema = Joi.object({
  // USER FIELDS
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),

  // ADMIN
  createdBy: Joi.string().required(),

  // STUDENT BASIC INFO
  fatherName: Joi.string().min(2).required(),
  motherName: Joi.string().min(2).required(),

  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required(),

  gender: Joi.string().valid("Male", "Female", "Other").required(),
  dob: Joi.date().required(),
  address: Joi.string().required(),

  whatsapp: Joi.string().required(),
  parentMobile: Joi.string().required(),

  // ACADEMIC
  academicYear: Joi.string().required(),
  currentClassYear: Joi.string().required(),
  board: Joi.string().required(),
  course: Joi.string().required(),
  medium: Joi.string().required(),
  previousAcademics: Joi.array().default([]),
  remarks: Joi.string().allow(""),

  branch: Joi.string().required(),
  assignedTeacher: Joi.array().items(Joi.string()).default([]),

  joiningDate: Joi.date().default(() => new Date()),
  leavingDate: Joi.date().allow(null),

  photo: Joi.string().allow("")
});

/* =======================
   CONTROLLER
======================= */

const addStudent = asyncHandler(async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    /* VALIDATION */
    const { error, value } = admissionCreationValidationSchema.validate(
      req.body,
      { abortEarly: false, stripUnknown: true }
    );

    if (error) {
      throw new ApiError(400, "Validation failed", error.details);
    }

    const {
      fullName,
      email,
      phone,
      password,

      createdBy,
      fatherName,
      motherName,
      bloodGroup,
      gender,
      dob,
      address,
      whatsapp,
      parentMobile,

      academicYear,
      currentClassYear,
      board,
      course,
      medium,
      previousAcademics,
      remarks,

      branch,
      assignedTeacher,
      joiningDate,
      leavingDate,
      photo
    } = value;

    /* ADMIN PERMISSION CHECK */
    const admin = await Admin.findById(createdBy);
    if (!admin) throw new ApiError(403, "Invalid admin");

    if (!admin.permissions?.includes("manage_students")) {
      throw new ApiError(403, "Admin does not have permission to add student");
    }

    /* DUPLICATE USER CHECK */
    const emailExists = await User.findOne({ email }).session(session);
    if (emailExists) throw new ApiError(409, "Email is already registered");

    const phoneExists = await User.findOne({ phone }).session(session);
    if (phoneExists) throw new ApiError(409, "Phone number already exists");

    /* CREATE USER */
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await User.create(
      [
        {
          fullName,
          email,
          phone,
          password: hashedPassword,
          role: "STUDENT",
          isActive: true
        }
      ],
      { session }
    );

    /* CREATE STUDENT */
    const [student] = await Student.create(
      [
        {
          userId: user._id,
          fatherName,
          motherName,
          bloodGroup,
          gender,
          dob,
          address,
          contact: { whatsapp, parentMobile },
          branch,
          assignedTeacher,
          joiningDate,
          leavingDate,
          status: "ACTIVE",
          isDeleted: false
        }
      ],
      { session }
    );

    /* ACADEMIC PROFILE */
    const [academicProfile] = await AcademicProfile.create(
      [
        {
          studentId: student._id,
          academicYear,
          currentClassYear,
          board,
          course,
          medium,
          previousAcademics,
          remarks
        }
      ],
      { session }
    );

    /* ADMISSION NUMBER GENERATION */
    const year = new Date().getFullYear();
    const counter = await CounterSchema.findOneAndUpdate(
      { key: `ADMISSION_${year}` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, session }
    );

    const admissionNumber = `KRJ/${year}/${String(counter.seq).padStart(4, "0")}`;

    /* ID CARD CREATION */
    const [idCard] = await IDCard.create(
      [
        {
          holderType: "STUDENT",
          holderId: student._id,
          idNumber: admissionNumber,
          branch,
          photo: photo || "/default-avatar.jpg",
          status: "ACTIVE"
        }
      ],
      { session }
    );

    /* RELATION LINKING */
    student.academicProfile = academicProfile._id;
    student.idCard = idCard._id;
    await student.save({ session });

    await Branch.updateOne(
      { _id: branch },
      { $addToSet: { students: student._id } },
      { session }
    );

    await session.commitTransaction();

    return successResponse(res, {
      statusCode: 201,
      message: "Student admission successful",
      data: {
        userId: user._id,
        studentId: student._id,
        admissionNumber
      }
    });
  } catch (error) {
    if (session) await session.abortTransaction();
    throw error;
  } finally {
    if (session) session.endSession();
  }
});

export default addStudent;
