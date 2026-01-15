import mongoose from "mongoose";

const feePaymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    studentFeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentFee",
      required: true,
      index: true,
    },

    installmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeeInstallment", // null when bulk adjustment
      default: null,
    },

    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },

    amountPaid: {
      type: Number,
      required: true,
    },

    paymentMode: {
      type: String,
      enum: ["CASH", "UPI", "CARD", "CHEQUE", "ONLINE"],
      required: true,
    },

    transactionId: {
      type: String,
      default: null,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
    },

    // Accounting Flags
    isRefund: {
      type: Boolean,
      default: false,
    },

    refundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeePayment",
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

// Indexes
feePaymentSchema.index({ studentId: 1 });
feePaymentSchema.index({ studentFeeId: 1 });
feePaymentSchema.index({ receiptNumber: 1 });
feePaymentSchema.index({ paymentDate: 1 });

export const FeePayment = mongoose.model("FeePayment", feePaymentSchema);



// Purpose:
// 👉 Student fee ka actual payment record yahi store hota hai.
// 👉 Whether he paid online, cash, UPI, cheque — sab track hoga.
// 👉 Har payment ek ya multiple installments ko affect kar sakta hai.
// 👉 Receipt number auto-increment (Counter schema se)


// 🔥 Why This Schema Is Important

// ✔ Accounting-friendly
// ✔ Auto receipt generation
// ✔ Refund + adjustment support
// ✔ Payment Mode filter + transaction details
// ✔ Supports real-time fee dashboard