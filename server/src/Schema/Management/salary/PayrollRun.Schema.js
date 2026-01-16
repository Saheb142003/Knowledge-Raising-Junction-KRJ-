import mongoose from "mongoose";

const payrollRunSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) PAYROLL PERIOD INFO
    // ----------------------------------------------------
    month: {
      type: Number, // 1–12
      required: true,
      index: true,
    },

    year: {
      type: Number,
      required: true,
      index: true,
    },

    payrollType: {
      type: String,
      enum: ["MONTHLY", "WEEKLY", "CUSTOM"],
      default: "MONTHLY",
    },

    periodStart: {
      type: Date,
      required: true,
    },

    periodEnd: {
      type: Date,
      required: true,
    },

    // ----------------------------------------------------
    // 2) BRANCH / ORGANIZATION CONTEXT
    // ----------------------------------------------------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    // ----------------------------------------------------
    // 3) INCLUDED EMPLOYEES + TEACHERS
    // ----------------------------------------------------
    employeesIncluded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],

    teachersIncluded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],

    // ----------------------------------------------------
    // 4) ATTENDANCE SUMMARY (NEW)
    // ----------------------------------------------------
    attendanceSummary: [
      {
        personType: { type: String, enum: ["EMPLOYEE", "TEACHER"] },
        personId: { type: mongoose.Schema.Types.ObjectId },
        totalPresent: Number,
        totalAbsent: Number,
        totalLeaves: Number,
        totalWorkingDays: Number,
        lateDays: Number,
        halfDays: Number,
      },
    ],

    // ----------------------------------------------------
    // 5) SALARY COMPONENTS (NEW)
    // ----------------------------------------------------
    globalSalaryComponents: [
      {
        componentId: { type: mongoose.Schema.Types.ObjectId, ref: "SalaryComponent" },
        name: String,
        type: { type: String, enum: ["EARNING", "DEDUCTION"] },
        amount: Number,
        formula: String, // e.g., "basic * 0.4"
      },
    ],

    // ----------------------------------------------------
    // 6) PAYROLL TOTALS (NEW)
    // ----------------------------------------------------
    totalEarnings: {
      type: Number,
      default: 0,
    },

    totalDeductions: {
      type: Number,
      default: 0,
    },

    netPayout: {
      type: Number,
      default: 0,
    },

    // ----------------------------------------------------
    // 7) SALARY SLIPS LINK (100% mapping fix)
    // ----------------------------------------------------
    salarySlips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalarySlip",
      },
    ],

    // ----------------------------------------------------
    // 8) PAYMENT STATUS (NEW)
    // ----------------------------------------------------
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PROCESSING", "PAID", "PARTIAL", "FAILED"],
      default: "PENDING",
    },

    paymentProcessedAt: {
      type: Date,
      default: null,
    },

    // Payment log mapping
    paymentRefs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],

    // ----------------------------------------------------
    // 9) APPROVAL SYSTEM (NEW)
    // ----------------------------------------------------
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["DRAFT", "REVIEW", "APPROVED", "REJECTED", "LOCKED"],
      default: "DRAFT",
      index: true,
    },

    // ----------------------------------------------------
    // 10) FLAGS (NEW)
    // ----------------------------------------------------
    autoCalculate: {
      type: Boolean,
      default: true,
    },

    lockAfterApproval: {
      type: Boolean,
      default: true,
    },

    remarks: {
      type: String,
      default: "",
    },

    // ----------------------------------------------------
    // 11) AUDIT + SOFT DELETE (NEW)
    // ----------------------------------------------------
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

// ----------------------------------------------------
// INDEXES
// ----------------------------------------------------
payrollRunSchema.index({ month: 1, year: 1, branch: 1 });
payrollRunSchema.index({ status: 1 });
payrollRunSchema.index({ payrollType: 1 });

export const PayrollRun = mongoose.model("PayrollRun", payrollRunSchema);
