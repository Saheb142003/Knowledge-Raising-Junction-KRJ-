import mongoose from "mongoose";

const idCardSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) HOLDER (Student / Employee / Teacher)
    // ----------------------------------------------------
    holderType: {
      type: String,
      enum: ["STUDENT", "EMPLOYEE", "TEACHER"],
      required: true,
      index: true,
    },

    holderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      refPath: "holderTypeRef",
    },

    // Dynamic reference model based on holderType
    holderTypeRef: {
      type: String,
      enum: ["Student", "Employee", "Teacher"],
      required: true,
    },

    // ----------------------------------------------------
    // 2) ID CARD DETAILS
    // ----------------------------------------------------
    idNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      default: null, // for students
    },

    photo: {
      type: String, // Cloudinary URL
      required: true,
    },

    qrCode: {
      type: String, // QR Code image / encoded string
    },

    barCode: {
      type: String, // If institute uses barcode scanners
      default: null,
    },

    // ----------------------------------------------------
    // 3) VALIDITY
    // ----------------------------------------------------
    issueDate: {
      type: Date,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    autoExpire: {
      type: Boolean,
      default: true,
    },

    // ----------------------------------------------------
    // 4) STATUS
    // ----------------------------------------------------
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "SUSPENDED", "REISSUED"],
      default: "ACTIVE",
      index: true,
    },

    printedCount: {
      type: Number,
      default: 0, // how many times printed?
    },

    isPrimaryCard: {
      type: Boolean,
      default: true, // multiple cards allowed in ERP
    },

    // ----------------------------------------------------
    // 5) REISSUE HISTORY (NEW — IMPORTANT)
    // ----------------------------------------------------
    reissueHistory: [
      {
        reissuedAt: { type: Date, default: Date.now },
        oldIdNumber: String,
        newIdNumber: String,
        reason: String,
        reissuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      },
    ],

    // ----------------------------------------------------
    // 6) ACCESS PERMISSIONS (NEW)
    // ----------------------------------------------------
    accessAllowed: {
      type: Boolean,
      default: true,
    },

    allowedAreas: [
      {
        type: String, // "Library", "Lab", "Hostel Gate", etc.
      },
    ],

    // ----------------------------------------------------
    // 7) QR ATTENDANCE LOGS (SUPER USEFUL)
    // ----------------------------------------------------
    scanLogs: [
      {
        scannedAt: { type: Date, default: Date.now },
        gate: String, // entry gate
        scannedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      },
    ],

    // ----------------------------------------------------
    // 8) META + SOFT DELETE
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
// UNIQUE INDEX RULES
// ----------------------------------------------------
idCardSchema.index({ holderType: 1, holderId: 1 }, { unique: true });
idCardSchema.index({ idNumber: 1 }, { unique: true });
idCardSchema.index({ status: 1 });
idCardSchema.index({ branch: 1 });

export const IDCard = mongoose.model("IDCard", idCardSchema);
