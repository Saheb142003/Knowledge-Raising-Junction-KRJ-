import mongoose from "mongoose";

const feeReceiptCounterSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      unique: true, // One counter per branch
      index: true,
    },

    prefix: {
      type: String,
      required: true, // e.g. "KRJ-2025"
    },

    seq: {
      type: Number,
      default: 0, // Auto increment
    },

    lastReceiptDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// INDEX
feeReceiptCounterSchema.index({ branch: 1 });

export const FeeReceiptCounter = mongoose.model(
  "FeeReceiptCounter",
  feeReceiptCounterSchema
);


// Purpose:
// 👉 Har branch ka alag–alag Auto Receipt Number generate karega.
// 👉 Format example:
// KRJ-2025-000123
// BLR-2025-000054

// Receipt number sequential, unique & branch-wise maintain hoga.

// Purpose:
// 👉 Har branch ka alag–alag Auto Receipt Number generate karega.
// 👉 Format example:
// KRJ-2025-000123
// BLR-2025-000054

// Receipt number sequential, unique & branch-wise maintain hoga.