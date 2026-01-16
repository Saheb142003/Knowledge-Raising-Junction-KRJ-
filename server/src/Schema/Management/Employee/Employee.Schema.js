import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    // --------------------------------------------------
    // 1) AUTH & PROFILE LINKS
    // --------------------------------------------------
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    idCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IDCard",
      default: null,
    },

    // --------------------------------------------------
    // 2) EMPLOYEE CODE (unique)
    // --------------------------------------------------
    employeeCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    // --------------------------------------------------
    // 3) HR DETAILS
    // --------------------------------------------------
    designation: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    employmentType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "CONTRACT"],
      default: "FULL_TIME",
    },

    experienceYears: {
      type: Number,
      default: 0,
    },

    // --------------------------------------------------
    // 4) BRANCH MAPPING
    // --------------------------------------------------
    branches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        index: true,
      },
    ],

    primaryBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default: null,
      index: true,
    },

    // --------------------------------------------------
    // 5) ATTENDANCE + LEAVE
    // --------------------------------------------------
    attendance: [
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

    availableToday: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "ON_LEAVE", "RESIGNED", "TERMINATED"],
      default: "ACTIVE",
      index: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    exitDate: {
      type: Date,
      default: null,
    },

    // --------------------------------------------------
    // 6) PAYROLL + SALARY
    // --------------------------------------------------
    salaryType: {
      type: String,
      enum: ["MONTHLY", "HOURLY", "PER_CLASS"],
      default: "MONTHLY",
    },

    salaryAmount: {
      type: Number,
      default: 0,
    },

    // Added hourly rate special field
    hourlyRate: {
      type: Number,
      default: 0,
    },

    // Payroll reference
    receivedPayrolls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payroll",
      },
    ],

    bankDetails: {
      accountHolderName: String,
      accountNumber: String,
      bankName: String,
      ifscCode: String,
      branchName: String,
    },

    // --------------------------------------------------
    // 7) DOCUMENTS
    // --------------------------------------------------
    documents: {
      idProof: String,
      addressProof: String,
      resume: String,
      offerLetter: String,
      joiningLetter: String,
      relievingLetter: String,
      certificates: [String],
    },

    documentsUploaded: {
      type: Boolean,
      default: false,
    },

    remarks: {
      type: String,
      default: "",
    },

    // --------------------------------------------------
    // 8) VERIFICATION
    // --------------------------------------------------
    isVerified: {
      type: Boolean,
      default: false,
    },

    // --------------------------------------------------
    // 9) AUDIT
    // --------------------------------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

// --------------------------------------------------
// INDEX OPTIMIZATION
// --------------------------------------------------
employeeSchema.index({ employeeCode: 1 });
employeeSchema.index({ designation: 1 });
employeeSchema.index({ department: 1 });
employeeSchema.index({ status: 1 });
employeeSchema.index({ primaryBranch: 1 });
employeeSchema.index({ salaryType: 1 });

export const Employee = mongoose.model("Employee", employeeSchema);
