import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema(
  {
    // ---------------------------------------------------
    // 1) CORE LINKS
    // ---------------------------------------------------
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    // ---------------------------------------------------
    // 2) RESULT SUMMARY
    // ---------------------------------------------------
    totalMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    obtainedMarks: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0, // NEW
    },

    rank: {
      type: Number,
      default: null, // NEW for topper list
    },

    isPassed: {
      type: Boolean,
      default: null,
    },

    // ---------------------------------------------------
    // 3) QUESTION-WISE RESPONSES
    // ---------------------------------------------------
    responses: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TestQuestion",
        },

        answer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean,
        marksAwarded: Number,

        timeTakenSeconds: { type: Number, default: 0 }, // NEW
      },
    ],

    // ---------------------------------------------------
    // 4) GRADING DETAILS
    // ---------------------------------------------------
    gradingType: {
      type: String,
      enum: ["AUTO", "MANUAL", "MIXED"],
      default: "AUTO",
    },

    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    evaluationStatus: {
      type: String,
      enum: ["NOT_EVALUATED", "EVALUATING", "EVALUATED"],
      default: "NOT_EVALUATED",
      index: true,
    },

    answerSheetUrl: {
      type: String,
      default: null, // NEW (Subjective exams)
    },

    // ---------------------------------------------------
    // 5) ONLINE EXAM ANALYTICS (NEW)
    // ---------------------------------------------------
    totalTimeTaken: {
      type: Number,
      default: 0,
    },

    accuracyPercentage: {
      type: Number,
      default: 0,
    },

    attemptedQuestions: {
      type: Number,
      default: 0,
    },

    correctCount: {
      type: Number,
      default: 0,
    },

    incorrectCount: {
      type: Number,
      default: 0,
    },

    skippedCount: {
      type: Number,
      default: 0,
    },

    // ---------------------------------------------------
    // 6) RESULT PUBLISH CONTROL (NEW)
    // ---------------------------------------------------
    publishStatus: {
      type: String,
      enum: ["NOT_PUBLISHED", "PUBLISHED"],
      default: "NOT_PUBLISHED",
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    // ---------------------------------------------------
    // 7) RECHECK / REVALUATION
    // ---------------------------------------------------
    recheckRequested: {
      type: Boolean,
      default: false,
    },

    recheckHistory: [
      {
        requestedAt: Date,
        resolvedAt: Date,
        previousMarks: Number,
        updatedMarks: Number,
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        },
        remarks: String,
      },
    ],

    // ---------------------------------------------------
    // 8) META INFO
    // ---------------------------------------------------
    remarks: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["NOT_EVALUATED", "EVALUATED", "RECHECK_REQUESTED"],
      default: "NOT_EVALUATED",
    },

    // ---------------------------------------------------
    // 9) AUDIT + SOFT DELETE
    // ---------------------------------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    deletedAt: { type: Date, default: null },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------
// INDEXES — SUPER FAST RESULT PROCESSING
// ---------------------------------------------------
testResultSchema.index({ testId: 1, studentId: 1 }, { unique: true });
testResultSchema.index({ evaluationStatus: 1 });
testResultSchema.index({ publishStatus: 1 });
testResultSchema.index({ isPassed: 1 });
testResultSchema.index({ percentage: -1 });

export const TestResult = mongoose.model("TestResult", testResultSchema);
