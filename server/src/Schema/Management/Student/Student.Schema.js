import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1) Linked User Account
    // -----------------------------------------------------
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // -----------------------------------------------------
    // 2) Basic Personal Details
    // -----------------------------------------------------
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: { type: Date },
    address: { type: String },

    contact: {
      whatsapp: { type: String },
      parentMobile: { type: String },
      alternateMobile: { type: String, default: "" }, // NEW
      email: { type: String, default: "" }, // NEW
    },

    profileImage: {
      type: String,
      default: "",
    },

    // -----------------------------------------------------
    // 3) Organization / Academic Mapping
    // -----------------------------------------------------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      index: true,
      default: null,
    },

    academicProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicProfile",
      default: null,
    },

    // Teachers assigned to this student
    assignedTeacher: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],

    // -----------------------------------------------------
    // 4) Join / Leave Info
    // -----------------------------------------------------
    admissionNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    joiningDate: { type: Date },
    leavingDate: { type: Date, default: null },

    leavingReason: {
      type: String,
      default: "",
    },

    // -----------------------------------------------------
    // 5) References (Attendance, Leave, Tests, Fees)
    // -----------------------------------------------------
    attendanceRef: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],

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
        ref: "StudentFee",
      },
    ],

    idCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IDCard",
      default: null,
    },

    onlineCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OnlineCoursePurchase",
      },
    ],

    // -----------------------------------------------------
    // 6) Login + Security (NEW)
    // -----------------------------------------------------
    lastLogin: { type: Date },
    loginDevices: [
      {
        deviceId: String,
        ip: String,
        loggedInAt: Date,
      },
    ],

    // -----------------------------------------------------
    // 7) Academic Status Flags
    // -----------------------------------------------------
    status: {
      type: String,
      enum: ["ACTIVE", "LEFT", "INACTIVE"],
      default: "ACTIVE",
      index: true,
    },

    isFeeDefaulter: {
      type: Boolean,
      default: false,
    },

    isBlacklisted: {
      type: Boolean,
      default: false,
    },

    // -----------------------------------------------------
    // 8) Soft Delete + Audit
    // -----------------------------------------------------
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: { type: Date, default: null },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------------
// Indexes
// ---------------------------------------------------------
studentSchema.index({ branch: 1, batch: 1 });
studentSchema.index({ assignedTeacher: 1 });
studentSchema.index({ status: 1 });
studentSchema.index({ admissionNumber: 1 });
studentSchema.index({ isFeeDefaulter: 1 });

export const Student = mongoose.model("Student", studentSchema);
