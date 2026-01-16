import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    // ---------------------------------------------------
    // 1) BASIC DETAILS (Your fields)
    // ---------------------------------------------------
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true, // plain text / HTML / JSON(editor)
    },

    attachmentUrl: {
      type: String,
      default: null,
    },

    // ---------------------------------------------------
    // 2) ACADEMIC MAPPING (FIXED & IMPROVED)
    // ---------------------------------------------------
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
      type: String, // NEW
      default: "",
    },

    topic: {
      type: String,
      default: "",
    },

    tags: [String],

    // ---------------------------------------------------
    // 3) ACCESS CONTROL (NEW)
    // ---------------------------------------------------
    isImportant: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: false, // Everyone or batch only?
    },

    visibility: {
      type: String,
      enum: ["PUBLIC", "PRIVATE", "BATCH_ONLY", "SELECTED_STUDENTS"],
      default: "BATCH_ONLY",
    },

    allowedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // ---------------------------------------------------
    // 4) ANALYTICS (IMPROVED)
    // ---------------------------------------------------
    views: {
      type: Number,
      default: 0,
    },

    viewLogs: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        viewedAt: { type: Date, default: Date.now },
        duration: Number, // NEW: how long read
      },
    ],

    averageReadTime: {
      type: Number,
      default: 0,
    },

    readCompletionRate: {
      type: Number,
      default: 0, // NEW %
    },

    // ---------------------------------------------------
    // 5) REVIEW + FEEDBACK (NEW)
    // ---------------------------------------------------
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

    // ---------------------------------------------------
    // 6) NOTES VERSION CONTROL (NEW)
    // ---------------------------------------------------
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

    // ---------------------------------------------------
    // 7) META / ADMIN (Improved)
    // ---------------------------------------------------
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

// ---------------------------------------------------
// INDEXES — OPTIMIZED
// ---------------------------------------------------
notesSchema.index({ subject: 1 });
notesSchema.index({ batch: 1 });
notesSchema.index({ teacher: 1 });
notesSchema.index({ isImportant: 1 });
notesSchema.index({ visibility: 1 });
notesSchema.index({ title: "text", topic: "text", content: "text", tags: "text" });

export const Notes = mongoose.model("Notes", notesSchema);
