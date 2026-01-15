import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema(
  {
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

    // Total marks for the test
    totalMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    // Marks obtained by student
    obtainedMarks: {
      type: Number,
      default: 0,
    },

    // Question-wise answers & evaluation
    responses: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TestQuestion",
        },
        answer: mongoose.Schema.Types.Mixed, // MCQ option, boolean, number, text etc.
        isCorrect: Boolean,
        marksAwarded: Number,
      },
    ],

    // Auto or manual grading
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

    remarks: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["NOT_EVALUATED", "EVALUATED", "RECHECK_REQUESTED"],
      default: "NOT_EVALUATED",
    },

    isPassed: {
      type: Boolean,
      default: null,
    },

    // Re-evaluation history
    recheckHistory: [
      {
        requestedAt: Date,
        resolvedAt: Date,
        previousMarks: Number,
        updatedMarks: Number,
        remarks: String,
      },
    ],
  },
  { timestamps: true }
);

// Indexes for fast reports
testResultSchema.index({ testId: 1, studentId: 1 }, { unique: true });
testResultSchema.index({ status: 1 });
testResultSchema.index({ isPassed: 1 });

export const TestResult = mongoose.model("TestResult", testResultSchema);


// (Stores each student's marks + answers + evaluation
// 🔥 Features

// ✔ Stores each student's full test result
// ✔ Stores question-wise answers
// ✔ Auto + manual grading support
// ✔ Recheck/re-evaluation supported
// ✔ Pass/Fail
// ✔ Teacher evaluation tracking
// ✔ Indexing for fast dashboards