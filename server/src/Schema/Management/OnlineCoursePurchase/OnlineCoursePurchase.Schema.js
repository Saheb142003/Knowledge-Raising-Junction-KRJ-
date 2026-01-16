import mongoose from "mongoose";

const OnlineCoursePurchaseSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) USER MAPPING (Your fields kept)
    // ----------------------------------------------------
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
      index: true,
    },

    // ----------------------------------------------------
    // 2) COURSE PURCHASE DETAILS (Your fields kept)
    // ----------------------------------------------------
    price: {
      type: Number,
      required: true,
    },

    purchasedAt: {
      type: Date,
      default: Date.now,
    },

    validityDays: {
      type: Number,
      default: 365,
    },

    expiryDate: {
      type: Date,
      default: null,
      index: true,
    },

    // ----------------------------------------------------
    // 3) COURSE ACCESS + CONTENT MAP (NEW & ADVANCED)
    // ----------------------------------------------------
    contentAccess: {
      videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "LectureVideo" }],
      notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notes" }],
      materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudyMaterial" }],
      tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
    },

    allowedModules: [
      {
        type: String,
        enum: ["VIDEOS", "NOTES", "MATERIALS", "TESTS", "ASSIGNMENTS"],
      },
    ],

    // ----------------------------------------------------
    // 4) PROGRESS TRACKING (Upgraded heavily)
    // ----------------------------------------------------
    progress: {
      completedVideos: { type: Number, default: 0 },
      totalVideos: { type: Number, default: 0 },

      completedNotes: { type: Number, default: 0 },
      totalNotes: { type: Number, default: 0 },

      completedTests: { type: Number, default: 0 },
      totalTests: { type: Number, default: 0 },

      percentage: { type: Number, default: 0 }, // auto-calc
    },

    // Individual content logs
    videoProgress: [
      {
        videoId: { type: mongoose.Schema.Types.ObjectId, ref: "LectureVideo" },
        watchedDuration: Number,
        totalDuration: Number,
        completed: Boolean,
        lastWatchedAt: Date,
      },
    ],

    notesProgress: [
      {
        notesId: { type: mongoose.Schema.Types.ObjectId, ref: "Notes" },
        isOpened: Boolean,
        completed: Boolean,
        openedAt: Date,
      },
    ],

    testProgress: [
      {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
        attempted: Boolean,
        score: Number,
        percentage: Number,
        attemptedAt: Date,
      },
    ],

    // ----------------------------------------------------
    // 5) ACCESS LOGS (Your field + improved)
    // ----------------------------------------------------
    accessLogs: [
      {
        videoId: { type: mongoose.Schema.Types.ObjectId, ref: "LectureVideo" },
        accessedAt: { type: Date, default: Date.now },
        durationWatched: Number,
        deviceInfo: {
          deviceId: String,
          os: String,
          model: String,
        },
      },
    ],

    lastAccessedAt: {
      type: Date,
      default: null,
    },

    // ----------------------------------------------------
    // 6) STATUS (Your field kept + improved)
    // ----------------------------------------------------
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "BLOCKED", "REFUNDED"],
      default: "ACTIVE",
      index: true,
    },

    // ----------------------------------------------------
    // 7) CERTIFICATE (NEW)
    // ----------------------------------------------------
    certificateIssued: {
      type: Boolean,
      default: false,
    },

    certificateUrl: {
      type: String,
      default: null,
    },

    // ----------------------------------------------------
    // 8) VERSION CONTROL (NEW)
    // ----------------------------------------------------
    version: {
      type: Number,
      default: 1,
    },

    versionHistory: [
      {
        version: Number,
        updatedAt: Date,
        changeSummary: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      },
    ],

    // ----------------------------------------------------
    // 9) SOFT DELETE + AUDIT
    // ----------------------------------------------------
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },

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

// ----------------------------------------------------
// INDEXES
// ----------------------------------------------------
OnlineCoursePurchaseSchema.index({ student: 1, course: 1 }, { unique: true });
OnlineCoursePurchaseSchema.index({ expiryDate: 1 });
OnlineCoursePurchaseSchema.index({ status: 1 });

export const OnlineCoursePurchase = mongoose.model(
  "OnlineCoursePurchase",
  OnlineCoursePurchaseSchema
);
