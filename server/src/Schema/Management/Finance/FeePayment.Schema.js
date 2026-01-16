import mongoose from "mongoose";

const feePaymentSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) WHO MADE THE PAYMENT
    // ----------------------------------------------------
    paidByType: {
      type: String,
      enum: ["STUDENT", "EMPLOYEE"],
      required: true,
      index: true,
    },

    paidById: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    // Explicit clarity
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    // ----------------------------------------------------
    // 2) CONTEXT
    // ----------------------------------------------------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      default: null,
    },

    // Student Fee Account
    studentFeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentFee",
      default: null,
      index: true,
    },

    // Installment this payment belongs to
    installmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeeInstallment",
      default: null,
      index: true,
    },

    // ----------------------------------------------------
    // 3) PAYMENT DETAILS
    // ----------------------------------------------------
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentType: {
      type: String,
      enum: ["FEES", "SALARY", "INCENTIVE", "REFUND", "PENALTY", "PURCHASE"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "UPI", "CARD", "NET_BANKING", "CHEQUE"],
      required: true,
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    utrNumber: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "SUCCESS",
      index: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // ----------------------------------------------------
    // 4) LATE FEES / ADJUSTMENTS (NEW)
    // ----------------------------------------------------
    lateFee: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    fine: {
      type: Number,
      default: 0,
    },

    adjustedAmount: {
      type: Number,
      default: 0, // For adjustments, rounding
    },

    // ----------------------------------------------------
    // 5) RECEIPT & INVOICE SUPPORT (NEW)
    // ----------------------------------------------------
    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    receiptGenerated: {
      type: Boolean,
      default: false,
    },

    remarkNote: {
      type: String,
      default: "",
    },

    // ----------------------------------------------------
    // 6) FISCAL PERIOD (for reports)
    // ----------------------------------------------------
    period: {
      month: { type: Number },
      year: { type: Number },
    },

    // ----------------------------------------------------
    // 7) EXTRA META
    // ----------------------------------------------------
    remarks: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    deletedAt: {
      type: Date,
      default: null,
    }
  },
  { timestamps: true }
);

// ----------------------------------------------------
// INDEXES FOR SPEED
// ----------------------------------------------------
feePaymentSchema.index({ paidByType: 1, paidById: 1 });
feePaymentSchema.index({ paymentType: 1 });
feePaymentSchema.index({ paymentDate: 1 });
feePaymentSchema.index({ studentFeeId: 1 });
feePaymentSchema.index({ installmentId: 1 });
feePaymentSchema.index({ branch: 1 });

export const FeePayment = mongoose.model("FeePayment", feePaymentSchema);
