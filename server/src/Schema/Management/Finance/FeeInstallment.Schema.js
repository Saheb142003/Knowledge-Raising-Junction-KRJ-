import mongoose from "mongoose";

const feeInstallmentSchema = new mongoose.Schema(
  {
    studentFeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentFee",
      required: true,
      index: true,
    },

    installmentName: {
      type: String,
      required: true, // e.g., "1st Installment"
    },

    dueDate: {
      type: Date,
      required: true,
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
      enum: ["PAID", "PARTIAL", "DUE"],
      default: "DUE",
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    // Link actual payments
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeePayment",
      },
    ],

    remarks: {
      type: String,
      default: "",
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

// Indexes
feeInstallmentSchema.index({ studentFeeId: 1 });
feeInstallmentSchema.index({ dueDate: 1 });

export const FeeInstallment = mongoose.model(
  "FeeInstallment",
  feeInstallmentSchema
);


// 🔥 Why This Schema Is Important

// ✔ Installment-wise payment tracking
// ✔ Due dates & partial payments handled
// ✔ Direct link to StudentFee for reports
// ✔ Perfect for reminders/notifications:
// ➡ "Your 2nd Installment is due tomorrow"