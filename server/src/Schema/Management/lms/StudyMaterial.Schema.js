import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1) BASIC DETAILS (Your fields)
    // -----------------------------------------------------
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["PDF", "DOC", "DOCX", "PPT", "PPTX", "IMAGE", "ZIP", "AUDIO", "VIDEO", "OTHER"],
      default: "PDF",
    },

    // -----------------------------------------------------
    // 2) LMS MAPPING (Improved)
    // -----------------------------------------------------
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
      index: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },

    chapter: {
      type: String,
      default: "",
    },

    topic: {
      type: String,
      default: "",
    },

    tags: [String],

    // -----------------------------------------------------
    // 3) ACCESS CONTROL (Advanced)
    // -----------------------------------------------------
    isPublic: {
      type: Boolean,
      default: false, // Everyone or only batch?
    },

    visibility: {
      type: String,
      enum: ["PUBLIC", "BATCH_ONLY", "PRIVATE", "SELECTED_STUDENTS"],
      default: "BATCH_ONLY",
    },

    allowedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // -----------------------------------------------------
    // 4) STUDENT ANALYTICS (Upgraded)
    // -----------------------------------------------------
    downloads: {
      type: Number,
      default: 0,
    },

    downloadLogs: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        downloadedAt: { type: Date, default: Date.now },
      },
    ],

    views: {
      type: Number,
      default: 0,
    },

    viewLogs: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        viewedAt: { type: Date, default: Date.now },
        duration: { type: Number, default: 0 }, // NEW
      },
    ],

    averageViewTime: {
      type: Number,
      default: 0,
    },

    // -----------------------------------------------------
    // 5) FEEDBACK + RATINGS (NEW)
    // -----------------------------------------------------
    comments: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    ratings: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        rating: { type: Number, min: 1, max: 5 },
        review: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },

    // -----------------------------------------------------
    // 6) VERSION CONTROL (NEW)
    // -----------------------------------------------------
    version: {
      type: Number,
      default: 1,
    },

    versionHistory: [
      {
        version: Number,
        updatedAt: Date,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
        changeSummary: String,
      },
    ],

    // -----------------------------------------------------
    // 7) STATUS / META
    // -----------------------------------------------------
    isActive: {
      type: Boolean,
      default: true,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

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

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

// -----------------------------------------------------
// INDEXES (Optimized)
// -----------------------------------------------------
studyMaterialSchema.index({ subject: 1 });
studyMaterialSchema.index({ batch: 1 });
studyMaterialSchema.index({ teacher: 1 });
studyMaterialSchema.index({ visibility: 1 });
studyMaterialSchema.index({
  title: "text",
  description: "text",
  chapter: "text",
  topic: "text",
  tags: "text",
});

export const StudyMaterial = mongoose.model(
  "StudyMaterial",
  studyMaterialSchema
);
