import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) APPLICANT DETAILS (Dynamic Reference)
    // ----------------------------------------------------
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      refPath: "applicantTypeRef",
    },

    applicantType: {
      type: String,
      enum: ["STUDENT", "TEACHER", "EMPLOYEE"],
      required: true,
      index: true,
    },

    applicantTypeRef: {
      type: String,
      enum: ["Student", "Teacher", "Employee"],
      required: true,
    },

    // ----------------------------------------------------
    // 2) ORGANIZATION CONTEXT
    // ----------------------------------------------------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      default: null, // only for Students
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null, // optional for student/teacher leave
    },

    // ----------------------------------------------------
    // 3) LEAVE DETAILS
    // ----------------------------------------------------
    startDate: {
      type: Date,
      required: true,
      index: true,
    },

    endDate: {
      type: Date,
      required: true,
      index: true,
    },

    durationDays: {
      type: Number,
      required: true,
      min: 1,
    },

    leaveType: {
      type: String,
      enum: ["CASUAL", "SICK", "PAID", "UNPAID", "EXAM", "PERSONAL", "OTHER"],
      default: "OTHER",
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    attachment: {
      type: String, // e.g. Medical Certificate
      default: null,
    },

    // ----------------------------------------------------
    // 4) APPROVAL FLOW (MULTI-LEVEL)
    // ----------------------------------------------------
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    approvalDate: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    // Multi-level approval (optional)
    approvalFlow: [
      {
        level: Number,
        approver: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
        status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"] },
        updatedAt: Date,
        remarks: String,
      },
    ],

    // ----------------------------------------------------
    // 5) HR LEAVE BALANCE (NEW)
    // ----------------------------------------------------
    leaveBalanceUsed: {
      type: Number,
      default: 0,
    },

    affectsPayroll: {
      type: Boolean,
      default: false, // Employees only
    },

    // ----------------------------------------------------
    // 6) NOTIFICATIONS (NEW)
    // ----------------------------------------------------
    notified: {
      type: Boolean,
      default: false,
    },

    notificationLogs: [
      {
        sentAt: Date,
        method: { type: String, enum: ["SMS", "EMAIL", "WHATSAPP", "APP"] },
        message: String,
      },
    ],

    // ----------------------------------------------------
    // 7) META + SOFT DELETE
    // ----------------------------------------------------
    remarks: {
      type: String,
      default: "",
    },

    isDeleted: {
      type: Boolean,
      default: false,
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

// ----------------------------------------------------
// INDEXES FOR SPEED
// ----------------------------------------------------
leaveSchema.index({ applicantId: 1, applicantType: 1 });
leaveSchema.index({ branch: 1, status: 1 });
leaveSchema.index({ startDate: 1, endDate: 1 });
leaveSchema.index({ leaveType: 1 });

export const Leave = mongoose.model("Leave", leaveSchema);
