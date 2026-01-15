import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
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

    fileUrl: {
      type: String,
      required: true, // PDF, DOCX, PPT file link
    },

    fileType: {
      type: String,
      enum: ["PDF", "DOC", "DOCX", "PPT", "PPTX", "IMAGE", "ZIP", "OTHER"],
      default: "PDF",
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

    tags: [String],

    isPublic: {
      type: Boolean,
      default: false, // Everyone can see? or only assigned batch?
    },

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

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// INDEXES
studyMaterialSchema.index({ subject: 1 });
studyMaterialSchema.index({ batch: 1 });
studyMaterialSchema.index({ teacher: 1 });
studyMaterialSchema.index({ title: "text", description: "text" });

export const StudyMaterial = mongoose.model(
  "StudyMaterial",
  studyMaterialSchema
);


// (Notes, PDFs, PPTs, Docs, Assignments Reference, etc.
// What This Schema Covers?

// ✔ Notes
// ✔ PPTs
// ✔ PDFs
// ✔ Chapter-wise materials
// ✔ Track who downloaded
// ✔ Search + Tags
// ✔ Batch-wise resource delivery