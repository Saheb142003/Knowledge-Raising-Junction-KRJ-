import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
  {
    feePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeePlan",
      required: true,
      index: true,
    },

    // Example: "Admission Fee", "Tuition Fee", "Exam Fee", "Library Fee"
    componentName: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    isOptional: {
      type: Boolean,
      default: false,
    },

    // Due settings
    dueDate: {
      type: Date,
      required: true,
    },

    // Late fine rule (specific to component)
    lateFeePerDay: {
      type: Number,
      default: 0,
    },

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

// Indexing for reports
feeStructureSchema.index({ feePlan: 1, componentName: 1 });
feeStructureSchema.index({ dueDate: 1 });

export const FeeStructure = mongoose.model("FeeStructure", feeStructureSchema);




// ⚡ What This Schema Solves

// ✔ Har course aur academic year ka detailed fee breakup
// ✔ Due-date wise reminders possible
// ✔ Optional component (transport, hostel) configurable
// ✔ Late fee system built-in
// ✔ Admin dashboard me fee analysis/report easy