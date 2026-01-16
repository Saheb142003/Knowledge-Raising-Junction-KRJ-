import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1) WHICH ENTITY? (student, employee, receipt, test...)
    // -----------------------------------------------------
    name: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    // -----------------------------------------------------
    // 2) BRANCH WISE COUNTER SUPPORT (optional)
    // -----------------------------------------------------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default: null,
      index: true,
    },

    // -----------------------------------------------------
    // 3) PREFIX (YEAR or CODE)
    // Example: KRJ-2025, EMP-2026, STD-2024
    // -----------------------------------------------------
    prefix: {
      type: String,
      required: true,
      trim: true,
    },

    // -----------------------------------------------------
    // 4) SEQUENCE NUMBER (Auto Increment)
    // -----------------------------------------------------
    seq: {
      type: Number,
      default: 0,
    },

    // -----------------------------------------------------
    // 5) FORMAT SETTINGS (ADDED)
    // -----------------------------------------------------
    padding: {
      type: Number,
      default: 6,  // gives 000001 format
    },

    yearlyReset: {
      type: Boolean,
      default: false,
    },

    lastResetYear: {
      type: Number,
      default: null,
    },

    // -----------------------------------------------------
    // 6) LAST GENERATED DOCUMENT ID (ADDED)
    // -----------------------------------------------------
    lastGeneratedCode: {
      type: String,
      default: null,
    },

    // -----------------------------------------------------
    // 7) FOR RECEIPTS, EMPLOYEES, STUDENTS LINKING
    // -----------------------------------------------------
    lastReferencedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    // -----------------------------------------------------
    // 8) AUDIT
    // -----------------------------------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// -----------------------------------------
// UNIQUE INDEX → SAME TYPE + SAME PREFIX + SAME BRANCH = 1 COUNTER
// -----------------------------------------
counterSchema.index(
  { name: 1, branch: 1, prefix: 1 },
  { unique: true, sparse: true }
);

// -----------------------------------------
// HELPER FUNCTION: Generate Next Code
// -----------------------------------------
counterSchema.methods.generateNextCode = function () {
  this.seq += 1;

  const paddedSeq = String(this.seq).padStart(this.padding, "0");
  const code = `${this.prefix}-${paddedSeq}`;

  this.lastGeneratedCode = code;
  return code;
};

export const Counter = mongoose.model("Counter", counterSchema);
