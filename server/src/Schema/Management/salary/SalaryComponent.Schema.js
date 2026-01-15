import mongoose from "mongoose";

const salaryComponentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,       // Example: Basic Pay, HRA, PF
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true, // Example: BASIC, HRA, PF
      trim: true,
    },

    type: {
      type: String,
      enum: ["EARNING", "DEDUCTION"],
      required: true,
    },

    calculationType: {
      type: String,
      enum: ["FIXED", "PERCENTAGE"],
      default: "FIXED",
    },

    amount: {
      type: Number,
      default: 0, // If FIXED
    },

    percentage: {
      type: Number,
      default: 0, // If PERCENTAGE — e.g., PF = 12%
    },

    applicableFor: {
      type: String,
      enum: ["TEACHER", "EMPLOYEE", "BOTH"],
      default: "BOTH",
    },

    isActive: {
      type: Boolean,
      default: true,
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

// Indexes
salaryComponentSchema.index({ code: 1 });
salaryComponentSchema.index({ type: 1 });
salaryComponentSchema.index({ applicableFor: 1 });

export const SalaryComponent = mongoose.model(
  "SalaryComponent",
  salaryComponentSchema
);


// This schema store karega salary ka breakdown:
// Basic Pay, HRA, DA, Bonus, Incentives, PF, ESI, TDS, etc.


// What This Schema Solves?

// ✔ Salary breakup dynamic ban jata hai
// ✔ Teacher/Employee salary rules alag-alag set ho sakte
// ✔ PF/TDS/ESI automatically calculate ho sakta
// ✔ Payroll run ke waqt auto-calculation easy