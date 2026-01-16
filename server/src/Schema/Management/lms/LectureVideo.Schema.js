import mongoose from "mongoose";

const lectureVideoSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1) BASIC DETAILS
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

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      default: "",
    },

    duration: {
      type: Number, // In seconds
      required: true,
    },

    // -----------------------------------------------------
    // 2) ACADEMIC CONTEXT
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
      type: String, // Optional: Chapter name
      default: "",
    },

    topic: {
      type: String, // Optional: Topic name
      default: "",
    },

    tags: [String],

    // -----------------------------------------------------
    // 3) VIDEO ACCESS CONTROLS (NEW)
    // -----------------------------------------------------
    accessType: {
      type: String,
      enum: ["PAID", "FREE", "BATCH_ONLY"],
      default: "BATCH_ONLY",
    },

    visibility: {
      type: String,
      enum: ["PUBLIC", "PRIVATE", "UNLISTED"],
      default: "PRIVATE",
    },

    allowedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    isDownloadable: {
      type: Boolean,
      default: false,
    },

    // -----------------------------------------------------
    // 4) WATCH ANALYTICS (IMPROVED)
    // -----------------------------------------------------
    views: {
      type: Number,
      default: 0,
    },

    viewLogs: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        watchedAt: { type: Date, default: Date.now },
        durationWatched: Number,
        completed: { type: Boolean, default: false },
      },
    ],

    averageWatchTime: {
      type: Number,
      default: 0,
    },

    watchCompletionRate: {
      type: Number,
      default: 0, // out of 100%
    },

    // -----------------------------------------------------
    // 5) VIDEO QUALITY OPTIONS (NEW)
    // -----------------------------------------------------
    videoQualities: [
      {
        resolution: String, // "144p", "360p", "720p", "1080p"
        url: String,
      },
    ],

    // -----------------------------------------------------
    // 6) COMMENTS & REVIEWS (NEW)
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
    // 7) ADMIN / META
    // -----------------------------------------------------
    sequenceNumber: {
      type: Number,
      default: 1, // For ordering playlist
    },

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

// -----------------------------------------------------
// INDEXES FOR FAST LMS PERFORMANCE
// -----------------------------------------------------
lectureVideoSchema.index({ subject: 1 });
lectureVideoSchema.index({ batch: 1 });
lectureVideoSchema.index({ teacher: 1 });
lectureVideoSchema.index({ topic: "text", title: "text", description: "text" });
lectureVideoSchema.index({ accessType: 1 });
lectureVideoSchema.index({ visibility: 1 });
lectureVideoSchema.index({ isActive: 1 });

export const LectureVideo = mongoose.model("LectureVideo", lectureVideoSchema);
