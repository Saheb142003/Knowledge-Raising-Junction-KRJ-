import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // ---------- BASIC INFO ----------
    fatherName: String,
    motherName: String,
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: Date,
    address: String,

    contact: {
      whatsapp: String,
      parentMobile: String,
    },
    password:{
      type:String,
      required:true
    },

    // ---------- ACADEMIC ----------
    academicProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicProfile",
    }, 

    // ---------- ORGANIZATION ----------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },

    

    assignedTeacher: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    }],

    joiningDate: Date,
    leavingDate: Date,

    // ---------- REFERENCES ----------
    attendanceRef: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    }],

    leaveRef: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leave",
      },
    ],

    testRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],

    feeAccount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],

    idCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IDCard",
    },

    onlineCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OnlineCoursePurchase",
      },
    ],

    status: {
      type: String,
      enum: ["ACTIVE", "LEFT", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", StudentSchema);
