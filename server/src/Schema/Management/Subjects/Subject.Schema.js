import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1) BASIC DETAILS
    // -----------------------------------------------------
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["THEORY", "LAB", "SEMINAR", "OPTIONAL"],
      default: "THEORY",
    },

    // -----------------------------------------------------
    // 2) COURSE MAPPING
    // -----------------------------------------------------
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
      index: true,
    },

    academicYear: {
      type: String, // Example: 2024-2025
      default: "",
      index: true,
    },

    // -----------------------------------------------------
    // 3) BATCH & TEACHER RELATIONS
    // -----------------------------------------------------
    batches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
      },
    ],

    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // -----------------------------------------------------
    // 4) TIMETABLE / ROUTINE MAPPING
    // -----------------------------------------------------
    routines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoutineSlot",
      },
    ],

    // -----------------------------------------------------
    // 5) TESTS + ASSIGNMENTS
    // -----------------------------------------------------
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],

    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],

    // -----------------------------------------------------
    // 6) CONTENT ATTACHED (NEW — Enhanced Linking)
    // -----------------------------------------------------
    lectureVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LectureVideo",
      },
    ],

    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
      },
    ],

    studyMaterials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudyMaterial",
      },
    ],

    // -----------------------------------------------------
    // 7) SYLLABUS / PROGRESS MONITORING
    // -----------------------------------------------------
    syllabusCompletion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    chapters: [
      {
        title: String,
        description: String,
        completed: { type: Boolean, default: false },
        progress: { type: Number, default: 0 },
        updatedAt: { type: Date, default: Date.now },
      },
    ],

    // -----------------------------------------------------
    // 8) STATUS + AUDIT + SOFT DELETE
    // -----------------------------------------------------
    isActive: {
      type: Boolean,
      default: true,
      index: true,
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

    deleteReason: {
      type: String,
      trim: true,
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
  },
  { timestamps: true }
);

// ---------------------------------------------------------
// ⭐ INDEXES — SUPER FAST SUBJECT MODULE
// ---------------------------------------------------------
subjectSchema.index({ name: 1 });
subjectSchema.index({ code: 1 }, { unique: true });
subjectSchema.index({ course: 1 });
subjectSchema.index({ batches: 1 });
subjectSchema.index({ teachers: 1 });
subjectSchema.index({ academicYear: 1 });
subjectSchema.index({ isActive: 1 });
subjectSchema.index({ syllabusCompletion: 1 });

export const Subject = mongoose.model("Subject", subjectSchema);
