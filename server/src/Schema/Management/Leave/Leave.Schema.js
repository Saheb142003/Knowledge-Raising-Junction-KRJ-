import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    // Who is taking the leave
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
 
    applicantType: {
      type: String,
      enum: ["STUDENT", "TEACHER", "EMPLOYEE"],
      required: true,
    },

    // Optional: branch context (very useful for admins)
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    // Leave details
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    durationDays: {
      type: Number,
      required: true,
      min: 1,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    // Status & approval flow
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

    // Optional metadata
    remarks: {
      type: String,
      default: "",
    },

    // Soft delete (important for audit)
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes for fast dashboards & reports
leaveSchema.index({ applicantId: 1, applicantType: 1 });
leaveSchema.index({ branch: 1, status: 1 });
leaveSchema.index({ startDate: 1, endDate: 1 });

export const Leave = mongoose.model("Leave", leaveSchema);
