import mongoose from "mongoose";

const feePlanSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) BASIC PLAN DETAILS
    // ----------------------------------------------------
    title: {
      type: String,
      required: true,
      trim: true,
    },

    academicYear: {
      type: String, // "2024-2025"
      required: true,
      index: true,
    },

    course: {
      type: String, // "Science", "JEE", "Commerce"
      required: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    totalAmount: {
      type: Number,
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

    // ----------------------------------------------------
    // 2) NEW — PLAN CATEGORY
    // ----------------------------------------------------
    category: {
      type: String,
      enum: ["REGULAR", "DROPPER", "FOUNDATION", "ONLINE", "OTHER"],
      default: "REGULAR",
      index: true,
    },

    // ----------------------------------------------------
    // 3) MAPPING WITH SUB-SCHEMAS
    // ----------------------------------------------------

    // Fee structure components under this plan
    components: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeeStructure",
      },
    ],

    // Students currently enrolled under this fee plan
    assignedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // ----------------------------------------------------
    // 4) ADVANCED SETTINGS (NEW)
    // ----------------------------------------------------

    // Discount rule support
    allowDiscount: {
      type: Boolean,
      default: true,
    },

    maxDiscountPercent: {
      type: Number,
      default: 0,
    },

    // Tax system support (if needed)
    taxPercentage: {
      type: Number,
      default: 0,
    },

    // Refund rules
    refundable: {
      type: Boolean,
      default: true,
    },

    refundRules: {
      type: String,
      default: "",
    },

    // Auto-calc settings
    autoGenerateInstallments: {
      type: Boolean,
      default: true,
    },

    // ----------------------------------------------------
    // 5) META FIELDS (NEW)
    // ----------------------------------------------------

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    visibleToStudents: {
      type: Boolean,
      default: false,
    },

    visibleOnWebsite: {
      type: Boolean,
      default: false,
    },

    // ----------------------------------------------------
    // 6) AUDIT FIELDS
    // ----------------------------------------------------
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
// INDEXES (HIGH PERFORMANCE)
// ----------------------------------------------------
feePlanSchema.index({ academicYear: 1 });
feePlanSchema.index({ course: 1 });
feePlanSchema.index({ category: 1 });
feePlanSchema.index({ isActive: 1 });

export const FeePlan = mongoose.model("FeePlan", feePlanSchema);
