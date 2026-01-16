import mongoose from "mongoose";

const salarySlipSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1) PAYROLL RUN (Monthly payroll batch)
    // -----------------------------------------------------
    payrollRun: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayrollRun",
      required: true,
      index: true,
    },

    // -----------------------------------------------------
    // 2) EMPLOYEE / TEACHER (Either one must be present)
    // -----------------------------------------------------
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
      index: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
      index: true,
    },

    // -----------------------------------------------------
    // 3) SALARY MONTH
    // -----------------------------------------------------
    month: {
      type: String, // e.g., "2026-01"
      required: true,
      index: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    // -----------------------------------------------------
    // 4) DAYS & ATTENDANCE SUMMARY
    // -----------------------------------------------------
    payableDays: { type: Number, default: 0 },
    presentDays: { type: Number, default: 0 },
    absentDays: { type: Number, default: 0 },
    lateDays: { type: Number, default: 0 },
    halfDays: { type: Number, default: 0 },
    weeklyOffDays: { type: Number, default: 0 },
    holidays: { type: Number, default: 0 },

    // -----------------------------------------------------
    // 5) COMPONENT SNAPSHOT (Earning + Deduction)
    // -----------------------------------------------------
    components: [
      {
        componentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SalaryComponent",
        },
        name: String,
        code: String,
        type: { type: String, enum: ["EARNING", "DEDUCTION"] },
        calculationType: String, // FIXED, PERCENTAGE, FORMULA, PER_DAY, etc
        amount: Number,
        taxable: Boolean,
        remarks: String,
      },
    ],

    // -----------------------------------------------------
    // 6) TOTALS
    // -----------------------------------------------------
    totalEarnings: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 },
    netPay: { type: Number, default: 0 },

    // -----------------------------------------------------
    // 7) PAYMENT RECORD
    // -----------------------------------------------------
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PROCESSING", "PAID", "FAILED"],
      default: "PENDING",
      index: true,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    transactionId: {
      type: String,
      default: null,
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "UPI", "BANK_TRANSFER", "CHEQUE", null],
      default: null,
    },

    // -----------------------------------------------------
    // 8) TAXES (OPTIONAL BUT IMPORTANT)
    // -----------------------------------------------------
    pfAmount: { type: Number, default: 0 },
    esiAmount: { type: Number, default: 0 },
    tdsAmount: { type: Number, default: 0 },
    professionalTax: { type: Number, default: 0 },

    // -----------------------------------------------------
    // 9) TEACHER SPECIFIC (Class Based Salary)
    // -----------------------------------------------------
    totalClassesTaken: { type: Number, default: 0 },
    perClassRate: { type: Number, default: 0 },
    classBasedEarnings: { type: Number, default: 0 },

    subjectsTaught: [
      {
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
        classesTaken: Number,
      },
    ],

    // -----------------------------------------------------
    // 10) NOTES + AUDIT + SOFT DELETE
    // -----------------------------------------------------
    remarks: { type: String, default: "" },

    preparedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

    deletedAt: { type: Date, default: null },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

// 🔥 Important Indexes
salarySlipSchema.index({ month: 1, employeeId: 1 });
salarySlipSchema.index({ month: 1, teacherId: 1 });
salarySlipSchema.index({ payrollRun: 1 });
salarySlipSchema.index({ paymentStatus: 1 });

export const SalarySlip = mongoose.model("SalarySlip", salarySlipSchema);
