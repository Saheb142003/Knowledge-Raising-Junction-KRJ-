import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) LINKED FEE PLAN
    // ----------------------------------------------------
    feePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeePlan",
      required: true,
      index: true,
    },

    // ----------------------------------------------------
    // 2) COMPONENT DETAILS
    // ----------------------------------------------------
    componentName: {
      type: String,
      required: true,
      trim: true,     // "Admission Fee", "Tuition Fee"
    },

    description: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    isOptional: {
      type: Boolean,
      default: false, // Transport, Hostel, Lab Fee etc.
    },

    // ----------------------------------------------------
    // 3) DUE DATE SETTINGS
    // ----------------------------------------------------
    dueDate: {
      type: Date,
      required: true,
    },

    allowPartialPayment: {
      type: Boolean,
      default: true,
    },

    // ----------------------------------------------------
    // 4) LATE FEE RULES (IMPROVED)
    // ----------------------------------------------------
    lateFeePerDay: {
      type: Number,
      default: 0,
    },

    maxLateFee: {
      type: Number,
      default: 0,
    },

    gracePeriodDays: {
      type: Number,
      default: 0,   // 3 days grace
    },

    autoLateFeeEnabled: {
      type: Boolean,
      default: true,
    },

    // ----------------------------------------------------
    // 5) DISCOUNT RULES (NEW)
    // ----------------------------------------------------
    allowDiscount: {
      type: Boolean,
      default: true,
    },

    maxDiscountPercent: {
      type: Number,
      default: 0,
    },

    scholarshipEligible: {
      type: Boolean,
      default: false,
    },

    // ----------------------------------------------------
    // 6) INSTALLMENT AUTO-MAPPING (NEW)
    // ----------------------------------------------------
    installmentOrder: {
      type: Number,
      default: 1, // 1st, 2nd, 3rd installment
    },

    autoGenerateInstallment: {
      type: Boolean,
      default: true,
    },

    // ----------------------------------------------------
    // 7) EXTRA META (NEW)
    // ----------------------------------------------------
    academicYear: {
      type: String, // for filtering
      index: true,
    },

    category: {
      type: String,
      enum: ["MANDATORY", "OPTIONAL", "SPECIAL"],
      default: "MANDATORY",
    },

    applicableForCourse: {
      type: String, // "JEE", "NEET", "SCIENCE", etc.
      default: "",
    },

    // ----------------------------------------------------
    // 8) AUDIT + SOFT DELETE
    // ----------------------------------------------------
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

// ----------------------------------------------------
// INDEXES
// ----------------------------------------------------
feeStructureSchema.index({ feePlan: 1, componentName: 1 });
feeStructureSchema.index({ dueDate: 1 });
feeStructureSchema.index({ academicYear: 1 });
feeStructureSchema.index({ category: 1 });

export const FeeStructure = mongoose.model(
  "FeeStructure",
  feeStructureSchema
);
