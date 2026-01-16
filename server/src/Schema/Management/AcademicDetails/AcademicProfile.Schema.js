import mongoose from "mongoose";

const AcademicProfileSchema = new mongoose.Schema(
  {
    // ---------------------------
    // STUDENT LINK
    // ---------------------------
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true, // 1 student = 1 current profile
      index: true,
    },

    // ---------------------------
    // CURRENT ACADEMIC YEAR
    // ---------------------------
    academicYear: {
      type: String, // "2024-2025"
      required: true,
      trim: true,
    },

    currentClassYear: {
      type: String, // "10th", "12th", "FY", etc.
      required: true,
      trim: true,
    },

    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",    // keep as your original (can change if board schema updated)
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    medium: {
      type: String,
      enum: ["ENGLISH", "HINDI", "BENGALI", "ODIA", "OTHER"],
      required: true,
    },

    // ---------------------------
    // PREVIOUS ACADEMIC HISTORY
    // ---------------------------
    previousAcademics: [
      {
        academicYear: String,
        classYear: String,

        board: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Board",
        },

        schoolOrCollegeName: String,

        marksObtained: Number,
        totalMarks: Number,
        percentage: Number,

        resultStatus: {
          type: String,
          enum: ["PASS", "FAIL", "APPEARING"],
          default: "APPEARING",
        },

        // 🔥 Added improvement (optional)
        medium: {
          type: String,
          enum: ["ENGLISH", "HINDI", "BENGALI", "ODIA", "OTHER"],
        },

        grade: {
          type: String,
          default: "",
        },

        documentUrl: {
          type: String, // marksheet/TC pdf
          default: null,
        },

        remarks: {
          type: String,
          default: "",
        },
      },
    ],

    // ---------------------------
    // EXTRA DETAILS
    // ---------------------------
    remarks: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    // ---------------------------
    // AUDIT FIELDS (IMPORTANT)
    // ---------------------------
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
  },
  { timestamps: true }
);

// ---------------------------
// INDEXES FOR DASHBOARD + SPEED
// ---------------------------
AcademicProfileSchema.index({ studentId: 1 });
AcademicProfileSchema.index({ academicYear: 1 });
AcademicProfileSchema.index({ course: 1 });
AcademicProfileSchema.index({ medium: 1 });
AcademicProfileSchema.index({ currentClassYear: 1 });

export const AcademicProfile = mongoose.model(
  "AcademicProfile",
  AcademicProfileSchema
);
