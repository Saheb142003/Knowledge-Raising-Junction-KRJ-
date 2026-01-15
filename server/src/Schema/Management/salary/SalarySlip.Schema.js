import mongoose from "mongoose";

const salarySlipSchema = new mongoose.Schema(
  {
    payrollRun: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayrollRun",
      required: true,
      index: true,
    },

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: false,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: false,
    },

    month: {
      type: String, // 2026-01
      required: true,
      index: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    // 💵 Salary Breakdown
    payableDays: Number,
    totalEarnings: Number,
    totalDeductions: Number,
    netPay: Number,

    // 🔍 Detailed Components (Basic, HRA, PF, ESI)
    components: [
      {
        componentId: { type: mongoose.Schema.Types.ObjectId, ref: "SalaryComponent" },
        name: String,
        type: { type: String, enum: ["EARNING", "DEDUCTION"] },
        amount: Number,
      },
    ],

    // Receipt / Transaction Details
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },

    paidAt: {
      type: Date,
      default: null,
    },

    transactionId: {
      type: String,
      default: null,
    },

    remarks: String,
  },
  { timestamps: true }
);

// Indexes
salarySlipSchema.index({ payrollRun: 1 });
salarySlipSchema.index({ month: 1, employeeId: 1 });
salarySlipSchema.index({ month: 1, teacherId: 1 });

export const SalarySlip = mongoose.model("SalarySlip", salarySlipSchema);


// Ye schema har teacher/employee ka individual salary slip store karega



// 🔥 What This Schema Solves?

// ✔ Every employee/teacher ka salary slip generate
// ✔ Salary breakdown stored for auditing
// ✔ Online payment tracking
// ✔ PayrollRun se link for reporting
// ✔ Branch-wise filtering possible