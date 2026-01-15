import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true, // plain text or HTML content
    },

    // Optional file attachment
    attachmentUrl: {
      type: String,
      default: null, // PDF/IMG if uploaded
    },

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

    topic: {
      type: String,
      default: "",
    },

    tags: [String],

    isImportant: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: false, // Notes visible to all or only batch?
    },

    views: {
      type: Number,
      default: 0,
    },

    viewLogs: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        viewedAt: { type: Date, default: Date.now },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Indexes
notesSchema.index({ subject: 1 });
notesSchema.index({ batch: 1 });
notesSchema.index({ teacher: 1 });
notesSchema.index({ title: "text", topic: "text", content: "text" });

export const Notes = mongoose.model("Notes", notesSchema);


// (Teacher uploads small text notes, topic explanations, summaries, formulas, chapter notes, etc.)

// 🔥 Covers:

// ✔ Chapter notes
// ✔ Topic summaries
// ✔ Formula lists
// ✔ Important notes
// ✔ View tracking
// ✔ PDF/IMG attachments
// ✔ Searchable notes