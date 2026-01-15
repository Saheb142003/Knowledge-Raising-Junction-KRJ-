import mongoose from "mongoose";

const studentFeeSchema = new mongoose.Schema(
  {
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
    },

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

    lastPaymentDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["PAID", "PARTIAL", "UNPAID"],
      default: "UNPAID",
    },

    // Auto-updated based on installments / payments
    installments: [
      {
        installmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FeeInstallment",
        },
      },
    ],

    payments: [
      {
        paymentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FeePayment",
        },
      },
    ],

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
  },
  { timestamps: true }
);

// Indexes
studentFeeSchema.index({ studentId: 1, academicYear: 1 }, { unique: true });
studentFeeSchema.index({ feePlan: 1 });

export const StudentFee = mongoose.model("StudentFee", studentFeeSchema);





// ⚡ Why This Schema Is Important

// ✔ Student's full fee ledger
// ✔ Total due calculation auto
// ✔ All fee transactions linked
// ✔ Perfect for dashboards → “This month unpaid students: 23”