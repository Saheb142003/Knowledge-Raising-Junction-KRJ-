import mongoose from "mongoose";

const studentFeeSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) STUDENT & FEE PLAN
    // ----------------------------------------------------
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    feePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeePlan",
      required: true,
      index: true,
    },

    academicYear: {
      type: String,
      required: true, // e.g. "2024-2025"
      index: true,
    },

    // ----------------------------------------------------
    // 2) FINANCIAL SUMMARY (IMPROVED)
    // ----------------------------------------------------
    totalPayable: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPaid: {
      type: Number,
      default: 0,
    },

    totalDue: {
      type: Number,
      default: 0,
    },

    totalDiscount: {
      type: Number,
      default: 0,
    },

    totalFine: {
      type: Number,
      default: 0,
    },

    totalLateFee: {
      type: Number,
      default: 0,
    },

    lastPaymentDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["PAID", "PARTIAL", "UNPAID"],
      default: "UNPAID",
      index: true,
    },

    // ----------------------------------------------------
    // 3) INSTALLMENT RELATION (FIXED)
    // ----------------------------------------------------
    installments: [
      {
        installmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FeeInstallment",
        },
      },
    ],

    // ----------------------------------------------------
    // 4) PAYMENT RELATION (FIXED & ENHANCED)
    // ----------------------------------------------------
    payments: [
      {
        paymentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FeePayment",
        },
      },
    ],

    // ----------------------------------------------------
    // 5) DUE SUMMARY (NEW — CRITICAL)
    // ----------------------------------------------------
    nextDueInstallment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeeInstallment",
      default: null,
    },

    nextDueDate: {
      type: Date,
      default: null,
    },

    isOverdue: {
      type: Boolean,
      default: false,
      index: true,
    },

    overdueAmount: {
      type: Number,
      default: 0,
    },

    // ----------------------------------------------------
    // 6) DISCOUNT / SCHOLARSHIP DETAILS (NEW)
    // ----------------------------------------------------
    discountDetails: [
      {
        discountType: { type: String },           // Scholarship, Special Discount
        amount: { type: Number, default: 0 },
        approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
        remarks: String,
      },
    ],

    scholarshipApplied: {
      type: Boolean,
      default: false,
    },

    // ----------------------------------------------------
    // 7) AUTO GENERATED LOGS (NEW)
    // ----------------------------------------------------
    feeLogs: [
      {
        action: String,
        amount: Number,
        date: { type: Date, default: Date.now },
        refId: mongoose.Schema.Types.ObjectId, // Payment or Installment
      },
    ],

    // ----------------------------------------------------
    // 8) META INFO
    // ----------------------------------------------------
    remarks: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
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

// ----------------------------------------------------
// UNIQUE INDEX (1 student = 1 fee account per year)
// ----------------------------------------------------
studentFeeSchema.index({ studentId: 1, academicYear: 1 }, { unique: true });

// ----------------------------------------------------
// FAST INDEXES FOR REPORTING
// ----------------------------------------------------
studentFeeSchema.index({ feePlan: 1 });
studentFeeSchema.index({ status: 1 });
studentFeeSchema.index({ isOverdue: 1 });
studentFeeSchema.index({ nextDueDate: 1 });

export const StudentFee = mongoose.model("StudentFee", studentFeeSchema);
