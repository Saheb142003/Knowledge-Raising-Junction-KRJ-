import mongoose from "mongoose";

const feeReceiptCounterSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) BRANCH WISE COUNTER (REQUIRED)
    // ----------------------------------------------------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      unique: true,      // One counter per branch
      index: true,
    },

    // ----------------------------------------------------
    // 2) RECEIPT FORMAT SETTINGS
    // ----------------------------------------------------
    prefix: {
      type: String,
      required: true,    // e.g. "KRJ-2025"
      trim: true,
    },

    // Optional: academic year based prefix
    academicYear: {
      type: String,      // e.g. "2024-2025"
      default: null,
      index: true,
    },

    // Full format example:
    // KRJ-2025/24-25/000123
    format: {
      type: String,
      default: "{PREFIX}/{YEAR}/{SEQ}",
    },

    // ----------------------------------------------------
    // 3) RECEIPT SEQUENCE COUNTER
    // ----------------------------------------------------
    seq: {
      type: Number,
      default: 0, // Auto-increments
    },

    resetEveryYear: {
      type: Boolean,
      default: true,
    },

    lastReceiptDate: {
      type: Date,
      default: null,
    },

    // ----------------------------------------------------
    // 4) NEXT RECEIPT PREVIEW (NEW)
    // ----------------------------------------------------
    nextPreviewNumber: {
      type: String,
      default: null, // show upcoming number before issue
    },

    // ----------------------------------------------------
    // 5) META (NEW - HELPFUL)
    // ----------------------------------------------------
    lastGeneratedReceipt: {
      type: String,
      default: null,
    },

    receiptPrefixHistory: [
      {
        yearRange: String,   // "2023-2024"
        prefixUsed: String,
        seqStart: Number,
        seqEnd: Number,
      },
    ],

    // ----------------------------------------------------
    // 6) AUDIT + SOFT DELETE
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
// INDEXES FOR SPEED
// ----------------------------------------------------
feeReceiptCounterSchema.index({ branch: 1 });
feeReceiptCounterSchema.index({ academicYear: 1 });

export const FeeReceiptCounter = mongoose.model(
  "FeeReceiptCounter",
  feeReceiptCounterSchema
);
