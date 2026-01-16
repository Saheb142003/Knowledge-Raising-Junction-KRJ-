import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // ---------------------------------------------------
    // 1) WHO PAID? (Your fields kept)
    // ---------------------------------------------------
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

    // ---------------------------------------------------
    // 2) CONTEXT (Your fields kept)
    // ---------------------------------------------------
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

    // ---------------------------------------------------
    // 3) PAYMENT DETAILS (Your fields kept)
    // ---------------------------------------------------
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
      enum: ["CASH", "UPI", "CARD", "NET_BANKING", "CHEQUE", "ONLINE"],
      required: true,
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED", "PARTIAL"],
      default: "SUCCESS",
      index: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // ---------------------------------------------------
    // 4) PAYMENT PROOF (NEW)
    // ---------------------------------------------------
    paymentProofUrl: {
      type: String,
      default: null, // Screenshot / receipt PDF
    },

    chequeNumber: {
      type: String,
      default: null,
    },

    chequeStatus: {
      type: String,
      enum: ["PENDING", "CLEARED", "BOUNCED"],
      default: "PENDING",
    },

    // ---------------------------------------------------
    // 5) ADVANCED ACCOUNTING (NEW)
    // ---------------------------------------------------
    feeInstallment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeeInstallment",
      default: null,
    },

    feePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeePlan",
      default: null,
    },

    studentFeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentFee",
      default: null,
    },

    // breakup (useful in detailed invoices)
    breakup: [
      {
        componentName: String, // "Tuition Fee", "Admission Fee"
        amount: Number,
      },
    ],

    lateFee: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    netAmount: {
      type: Number,
      default: 0,
    },

    // ---------------------------------------------------
    // 6) ONLINE PAYMENT GATEWAY METADATA (NEW)
    // ---------------------------------------------------
    gateway: {
      type: String,
      enum: ["RAZORPAY", "STRIPE", "PAYTM", "CASHFREE", "NONE"],
      default: "NONE",
    },

    gatewayResponse: {
      type: Object,
      default: {},
    },

    orderId: {
      type: String,
      default: null,
    },

    // ---------------------------------------------------
    // 7) REFUND SYSTEM (NEW)
    // ---------------------------------------------------
    refundDetails: {
      refunded: { type: Boolean, default: false },
      refundAmount: { type: Number, default: 0 },
      refundedAt: { type: Date, default: null },
      refundTransactionId: { type: String, default: null },
    },

    // ---------------------------------------------------
    // 8) PERIOD (Your fields kept)
    // ---------------------------------------------------
    period: {
      month: { type: Number }, // 1–12
      year: { type: Number },
    },

    // ---------------------------------------------------
    // 9) RECEIPT SYSTEM (NEW)
    // ---------------------------------------------------
    receiptNo: {
      type: String, // generated from FeeReceiptCounter
      unique: true,
      sparse: true,
    },

    receiptUrl: {
      type: String,
      default: null,
    },

    // ---------------------------------------------------
    // 10) AUDIT
    // ---------------------------------------------------
    remarks: {
      type: String,
      default: "",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
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
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------
// INDEXES (Optimized)
// ---------------------------------------------------
paymentSchema.index({ paidByType: 1, paidById: 1 });
paymentSchema.index({ paymentType: 1 });
paymentSchema.index({ paymentDate: 1 });
paymentSchema.index({ receiptNo: 1 });
paymentSchema.index({ feeInstallment: 1 });
paymentSchema.index({ status: 1 });

export const Payment = mongoose.model("Payment", paymentSchema);
