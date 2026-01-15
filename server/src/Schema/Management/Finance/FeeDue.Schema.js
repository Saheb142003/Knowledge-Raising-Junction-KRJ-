import mongoose from "mongoose";

const feeDueSchema = new mongoose.Schema(
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
      ref: "FeeInstallment",
      required: true,
      index: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

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

    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String,
      default: "",
    },

    notified: {
      type: Boolean,
      default: false, // SMS/WhatsApp/Notification sent?
    },
  },
  { timestamps: true }
);

// INDEXES FOR FAST DASHBOARD & FILTERS
feeDueSchema.index({ studentId: 1, status: 1 });
feeDueSchema.index({ branch: 1, status: 1 });
feeDueSchema.index({ dueDate: 1 });

export const FeeDue = mongoose.model("FeeDue", feeDueSchema);

// Purpose:
// 👉 Admin dashboard me “Due List”, “Month wise pending fees”, “Branch wise dues”, “Student wise dues” sab isi se ayega.
// 👉 Har student ke due ko daily/cron se update kiya ja sakta hai.
// 👉 FeeInstallment + FeePayment ke base par actual pending amount calculate hota hai.


// Why This Schema Is Critical

// ✔ Admin dashboard ka Dues List
// ✔ Overdue Students
// ✔ This Month Fees Not Paid (exact as you wanted)
// ✔ Branch wise fee status
// ✔ Supports fee reminder automation
// ✔ Helps generate fee reports