import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) SUBJECT / TEACHER / BATCH LINKING
    // ----------------------------------------------------
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },

    batches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true,
      },
    ],

    // Students included in test
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // ----------------------------------------------------
    // 2) BASIC TEST INFO
    // ----------------------------------------------------
    testName: {
      type: String,
      required: true,
      trim: true,
    },

    testType: {
      type: String,
      enum: ["MCQ", "SUBJECTIVE", "MIXED", "PRACTICAL"],
      default: "MIXED",
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    testDate: {
      type: Date,
      required: true,
      index: true,
    },

    durationMinutes: {
      type: Number,
      default: 60,
    },

    // ----------------------------------------------------
    // 3) MARKING STRUCTURE
    // ----------------------------------------------------
    totalMarks: {
      type: Number,
      required: true,
    },

    passMarks: {
      type: Number,
      default: 0,
    },

    obtainedMarks: {
      type: Number,
      default: 0, // NOTE: remove? (obtained marks should be per student)
    },

    allowNegativeMarking: {
      type: Boolean,
      default: false,
    },

    negativeMarksPerQuestion: {
      type: Number,
      default: 0,
    },

    // ----------------------------------------------------
    // 4) QUESTION BANK LINKING
    // ----------------------------------------------------
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestQuestion",
      },
    ],

    // ----------------------------------------------------
    // 5) RESULT / ANALYTICS / STATUS
    // ----------------------------------------------------
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestResult",
      },
    ],

    status: {
      type: String,
      enum: ["SCHEDULED", "ONGOING", "COMPLETED", "PUBLISHED", "CANCELLED"],
      default: "SCHEDULED",
      index: true,
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    allowRetest: {
      type: Boolean,
      default: false,
    },

    maxAttempts: {
      type: Number,
      default: 1,
    },

    // ----------------------------------------------------
    // 6) SECURITY (for online exam)
    // ----------------------------------------------------
    shuffleQuestions: {
      type: Boolean,
      default: true,
    },

    shuffleOptions: {
      type: Boolean,
      default: true,
    },

    restrictTabChange: {
      type: Boolean,
      default: false,
    },

    // ----------------------------------------------------
    // 7) META + AUDIT
    // ----------------------------------------------------
    remarks: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
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
// INDEXES (Super fast dashboards)
// ----------------------------------------------------
TestSchema.index({ teacherId: 1 });
TestSchema.index({ subjectId: 1 });
TestSchema.index({ batches: 1 });
TestSchema.index({ testType: 1 });
TestSchema.index({ status: 1 });
TestSchema.index({ testDate: 1 });

export const Test = mongoose.model("Test", TestSchema);
