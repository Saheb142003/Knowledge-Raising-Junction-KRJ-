import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Who is receiving or paying
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

    // Optional references for clarity
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

    // Context
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      default: null, // usually for students
    },

    // Payment details
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
      enum: ["FEES", "SALARY", "INCENTIVE", "REFUND", "PENALTY","PURCHASE"],
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

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "SUCCESS",
      index: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // Salary / fee period (important for reports)
    period: {
      month: { type: Number }, // 1–12
      year: { type: Number },
    },

    remarks: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
  },
  { timestamps: true }
);

// INDEXES FOR REPORTING
paymentSchema.index({ paidByType: 1, paidById: 1 });
paymentSchema.index({ paymentType: 1 });
paymentSchema.index({ paymentDate: 1 });

export const Payment = mongoose.model("Payment", paymentSchema);
