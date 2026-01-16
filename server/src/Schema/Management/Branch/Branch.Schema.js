import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
  {
    // -------------------------------------------------------
    // 1. BASIC INFO
    // -------------------------------------------------------
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    branchCode: {
      type: String, // KRJ-year-branch-num
      required: true,
      trim: true,
      unique: true,
      index: true,
    },

    // -------------------------------------------------------
    // 2. CONTACT & LOCATION (ADDED FOR COMPLETE ERP)
    // -------------------------------------------------------
    phone: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },

    geoLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },

    // -------------------------------------------------------
    // 3. RELATIONSHIPS (Your original fields preserved)
    // -------------------------------------------------------

    // All batches in this branch
    batches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
      },
    ],

    // All students in this branch
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // Employees assigned to this branch
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],

    // Admins who manage this branch
    managedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],

    // -------------------------------------------------------
    // 4. FINANCIAL MAPPING (ADDED)
    // -------------------------------------------------------
    feeReceiptCounter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeeReceiptCounter",
      default: null,
    },

    bankDetails: {
      accountName: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String,
    },

    // -------------------------------------------------------
    // 5. CAPACITY & OPERATIONS (ADDED)
    // -------------------------------------------------------
    studentCapacity: { type: Number, default: 1000 },
    currentStudentCount: { type: Number, default: 0 },

    employeeCapacity: { type: Number, default: 50 },
    currentEmployeeCount: { type: Number, default: 0 },

    // -------------------------------------------------------
    // 6. STATUS
    // -------------------------------------------------------
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    // -------------------------------------------------------
    // 7. AUDIT FIELDS (IMPROVED)
    // -------------------------------------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

// -------------------------------------------------------
// VIRTUAL FIELDS
// -------------------------------------------------------
BranchSchema.virtual("remainingStudentCapacity").get(function () {
  return this.studentCapacity - this.currentStudentCount;
});

BranchSchema.virtual("remainingEmployeeCapacity").get(function () {
  return this.employeeCapacity - this.currentEmployeeCount;
});

// -------------------------------------------------------
// INDEXES
// -------------------------------------------------------
BranchSchema.index({ name: 1 });
BranchSchema.index({ isActive: 1 });
BranchSchema.index({ managedBy: 1 });
BranchSchema.index({ students: 1 });
BranchSchema.index({ employees: 1 });
BranchSchema.index({ batches: 1 });

export const Branch = mongoose.model("Branch", BranchSchema);
