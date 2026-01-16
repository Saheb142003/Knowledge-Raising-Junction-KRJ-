import mongoose from "mongoose";

const feeDueSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------------
    // 1) STUDENT + FEE ACCOUNT REFERENCES
    // ----------------------------------------------------------
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
      ref: "FeeInstallment",
      required: true,
      index: true,
    },

    // ----------------------------------------------------------
    // 2) BRANCH
    // ----------------------------------------------------------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    // ----------------------------------------------------------
    // 3) DUE DETAILS
    // ----------------------------------------------------------
    dueAmount: {
      type: Number,
      required: true,
    },

    totalInstallmentAmount: {
      type: Number,
      required: true,
    },

    totalPaidAmount: {
      type: Number,
      default: 0,
    },

    lateFeePerDay: {
      type: Number,
      default: 0,
    },

    accumulatedLateFee: {
      type: Number,
      default: 0, // auto-updated
    },

    finalPayableAmount: {
      type: Number,
      default: 0, // due + lateFee
    },

    // ----------------------------------------------------------
    // 4) DUE STATUS
    // ----------------------------------------------------------
    dueDate: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["DUE", "PARTIALLY_PAID", "PAID", "OVERDUE"],
      default: "DUE",
      index: true,
    },

    // auto-calculation fields
    isOverdue: {
      type: Boolean,
      default: false,
      index: true,
    },

    overdueDays: {
      type: Number,
      default: 0,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    // ----------------------------------------------------------
    // 5) REMINDER / NOTIFICATION SYSTEM
    // ----------------------------------------------------------
    notified: {
      type: Boolean,
      default: false, // SMS/WhatsApp/Notification sent?
    },

    lastReminderSentAt: {
      type: Date,
      default: null,
    },

    reminderCount: {
      type: Number,
      default: 0,
    },

    // Auto-reminder logs
    reminderLogs: [
      {
        sentAt: Date,
        method: { type: String, enum: ["SMS", "EMAIL", "WHATSAPP", "APP"] },
        message: String,
      },
    ],

    // ----------------------------------------------------------
    // 6) META
    // ----------------------------------------------------------
    academicYear: {
      type: String,
      default: null,
      index: true,
    },

    installmentName: {
      type: String,
      default: "",
    },

    remarks: {
      type: String,
      default: "",
    },

    // ----------------------------------------------------------
    // 7) AUDIT + SOFT DELETE
    // ----------------------------------------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
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

// ----------------------------------------------------------
// INDEXES (HIGH-PERFORMANCE DASHBOARD)
// ----------------------------------------------------------
feeDueSchema.index({ studentId: 1, status: 1 });
feeDueSchema.index({ branch: 1, status: 1 });
feeDueSchema.index({ dueDate: 1 });
feeDueSchema.index({ isOverdue: 1 });
feeDueSchema.index({ academicYear: 1 });

export const FeeDue = mongoose.model("FeeDue", feeDueSchema);
