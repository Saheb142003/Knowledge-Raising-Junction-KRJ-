import mongoose from "mongoose";

const feePlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Example: "Class 11 Science - Regular Plan"
    },

    academicYear: {
      type: String, // "2024-2025"
      required: true,
    },

    course: {
      type: String, // "Science", "JEE", "Commerce"
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    totalAmount: {
      type: Number, // Full fees for the year
      required: true,
      min: 0,
    },

    allowInstallments: {
      type: Boolean,
      default: true,
    },

    numberOfInstallments: {
      type: Number,
      default: 1,
      min: 1,
    },

    lateFeePerDay: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
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

// Indexes for speed
feePlanSchema.index({ academicYear: 1 });
feePlanSchema.index({ course: 1 });
feePlanSchema.index({ isActive: 1 });

export const FeePlan = mongoose.model("FeePlan", feePlanSchema);


// ⚡ What This Schema Solves

// ✔ “Class 11 Science Plan” banega
// ✔ “JEE Long-Term Plan” banega
// ✔ Academic year-wise fee structure maintain
// ✔ EMI/Installment support
// ✔ Administrative indexing ready