import mongoose from "mongoose";

const feeInstallmentSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) PARENT FEE ACCOUNT
    // ----------------------------------------------------
    studentFeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentFee",
      required: true,
      index: true,
    },

    // ----------------------------------------------------
    // 2) INSTALLMENT BASIC DETAILS
    // ----------------------------------------------------
    installmentName: {
      type: String,
      required: true, // "1st Installment", "Registration Fee"
      trim: true,
    },

    dueDate: {
      type: Date,
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["PAID", "PARTIAL", "DUE", "OVERDUE"],
      default: "DUE",
      index: true,
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    // ----------------------------------------------------
    // 3) PAYMENT MAPPING
    // ----------------------------------------------------
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeePayment",
      },
    ],

    // ----------------------------------------------------
    // 4) LATE FEE SYSTEM (NEW + IMPORTANT)
    // ----------------------------------------------------
    lateFeePerDay: {
      type: Number,
      default: 0,
    },

    overdueDays: {
      type: Number,
      default: 0,
    },

    accumulatedLateFee: {
      type: Number,
      default: 0,
    },

    finalPayableAmount: {
      type: Number,
      default: 0, // amount + accumulatedLateFee
    },

    isOverdue: {
      type: Boolean,
      default: false,
      index: true,
    },

    // ----------------------------------------------------
    // 5) REMINDER SYSTEM (NEW)
    // ----------------------------------------------------
    notified: {
      type: Boolean,
      default: false,
    },

    lastReminderSentAt: {
      type: Date,
      default: null,
    },

    reminderCount: {
      type: Number,
      default: 0,
    },

    reminderLogs: [
      {
        sentAt: Date,
        method: { type: String, enum: ["SMS", "EMAIL", "WHATSAPP", "APP"] },
        message: String,
      },
    ],

    // ----------------------------------------------------
    // 6) EXTRA META (NEW)
    // ----------------------------------------------------
    academicYear: {
      type: String,
      default: null,
      index: true,
    },

    feeComponentName: {
      type: String, // optional: "Tuition Fee", "Admission Fee", etc.
      default: "",
    },

    remarks: {
      type: String,
      default: "",
    },

    // ----------------------------------------------------
    // 7) AUDIT + SOFT DELETE
    // ----------------------------------------------------
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

// ----------------------------------------------------
// INDEXES
// ----------------------------------------------------
feeInstallmentSchema.index({ studentFeeId: 1 });
feeInstallmentSchema.index({ dueDate: 1 });
feeInstallmentSchema.index({ paymentStatus: 1 });
feeInstallmentSchema.index({ isOverdue: 1 });
feeInstallmentSchema.index({ academicYear: 1 });

export const FeeInstallment = mongoose.model(
  "FeeInstallment",
  feeInstallmentSchema
);
