import mongoose from "mongoose";

const lectureVideoSchema = new mongoose.Schema(
  {
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
      type: Number, // total seconds
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    // Who watched this video?
    viewLogs: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        watchedAt: { type: Date, default: Date.now },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    tags: [String],
  },
  { timestamps: true }
);

// INDEXES
lectureVideoSchema.index({ subject: 1 });
lectureVideoSchema.index({ batch: 1 });
lectureVideoSchema.index({ teacher: 1 });
lectureVideoSchema.index({ title: "text", description: "text" });

export const LectureVideo = mongoose.model("LectureVideo", lectureVideoSchema);



// Yeh schema teacher ke recorded video lectures store karega

// What This Schema Provides?

// ✔ Teacher can upload recorded videos
// ✔ Students can watch anytime
// ✔ Batch + Subject + Teacher mapping
// ✔ Track which student watched
// ✔ Searchable by title/description
// ✔ Tag-based filtering