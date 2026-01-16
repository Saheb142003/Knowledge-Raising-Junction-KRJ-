import mongoose from "mongoose";

const salaryComponentSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) BASIC DETAILS
    // ----------------------------------------------------
    name: {
      type: String,
      required: true,
      trim: true, // e.g., "Basic", "HRA", "DA", "PF", "Professional Tax"
    },

    code: {
      type: String,
      required: true,
      unique: true,
      trim: true, // e.g., "BASIC", "HRA40", "PF12"
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    // ----------------------------------------------------
    // 2) TYPE: EARNING / DEDUCTION
    // ----------------------------------------------------
    type: {
      type: String,
      enum: ["EARNING", "DEDUCTION"],
      required: true,
    },

    // ----------------------------------------------------
    // 3) CALCULATION TYPE
    // ----------------------------------------------------
    calculationType: {
      type: String,
      enum: [
        "FIXED",         // 5000
        "PERCENTAGE",    // percentage of basic
        "FORMULA",       // custom formula (basic * 0.4)
        "PER_DAY",       // auto per day based on attendance
        "HOURLY",        // hourly wages
        "CLASS_BASED",   // per class, for teachers
      ],
      required: true,
    },

    // ----------------------------------------------------
    // 4) VALUE / FORMULA
    // ----------------------------------------------------
    amount: {
      type: Number,
      default: 0, // used when FIXED
    },

    percentageOf: {
      type: String,
      enum: ["BASIC", "GROSS", "NET", "TOTAL_EARNINGS"],
      default: null, // used when PERCENTAGE
    },

    formula: {
      type: String,
      default: null, // e.g., "(basic * 0.4) + (da * 0.1)"
    },

    // ----------------------------------------------------
    // 5) RULES + LIMITS (Advanced)
    // ----------------------------------------------------
    autoApply: {
      type: Boolean,
      default: true, // automatically included in payroll
    },

    minAmount: {
      type: Number,
      default: 0,
    },

    maxAmount: {
      type: Number,
      default: null,
    },

    isTaxable: {
      type: Boolean,
      default: true,
    },

    taxExemptionLimit: {
      type: Number,
      default: 0,
    },

    // ----------------------------------------------------
    // 6) APPLICABILITY RULES (NEW)
    // ----------------------------------------------------
    appliesTo: {
      type: String,
      enum: ["ALL", "EMPLOYEE", "TEACHER"],
      default: "ALL",
    },

    minExperienceRequired: {
      type: Number,
      default: 0,
    },

    designationBased: [
      {
        type: String, // e.g., "Senior Teacher", "Accountant"
      },
    ],

    employmentTypeBased: [
      {
        type: String, // FULL_TIME | PART_TIME | CONTRACT
      },
    ],

    // ----------------------------------------------------
    // 7) ATTENDANCE INTEGRATION (NEW)
    // ----------------------------------------------------
    dependsOnAttendance: {
      type: Boolean,
      default: false,
    },

    absentDeductionPerDay: {
      type: Number,
      default: 0,
    },

    latePenaltyPerDay: {
      type: Number,
      default: 0,
    },

    halfDayCalculation: {
      type: Number,
      default: 0,
    },

    // ----------------------------------------------------
    // 8) TEACHER CLASS-BASED SALARY (NEW)
    // ----------------------------------------------------
    perClassAmount: {
      type: Number,
      default: 0,
    },

    classBasedSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    // ----------------------------------------------------
    // 9) COMPONENT CATEGORY (NEW)
    // ----------------------------------------------------
    category: {
      type: String,
      enum: [
        "BASIC",
        "ALLOWANCE",
        "DEDUCTION",
        "INCENTIVE",
        "BONUS",
        "PENALTY",
        "TAX",
        "OTHER",
      ],
      default: "OTHER",
    },

    // ----------------------------------------------------
    // 10) SORT ORDER (NEW)
    // ----------------------------------------------------
    sortOrder: {
      type: Number,
      default: 0,
    },

    // ----------------------------------------------------
    // 11) STATUS
    // ----------------------------------------------------
    isActive: {
      type: Boolean,
      default: true,
    },

    // ----------------------------------------------------
    // 12) AUDIT + SOFT DELETE
    // ----------------------------------------------------
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true }
);

// INDEXES
salaryComponentSchema.index({ type: 1 });
salaryComponentSchema.index({ calculationType: 1 });
salaryComponentSchema.index({ isActive: 1 });

export const SalaryComponent = mongoose.model(
  "SalaryComponent",
  salaryComponentSchema
);
