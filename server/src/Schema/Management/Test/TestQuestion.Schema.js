import mongoose from "mongoose";

const testQuestionSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
      index: true,
    },

    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    questionType: {
      type: String,
      enum: ["MCQ", "TRUE_FALSE", "SUBJECTIVE", "NUMERIC"],
      required: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
    },

    // --------- MCQ OPTIONS ---------
    options: [
      {
        optionText: String,
        isCorrect: Boolean,
      },
    ],

    // -------- TRUE/FALSE ANSWER --------
    correctBooleanAnswer: {
      type: Boolean,
      default: null,
    },

    // -------- NUMERIC ANSWER --------
    correctNumericAnswer: {
      type: Number,
      default: null,
    },

    // -------- SUBJECTIVE MODEL ANSWER --------
    correctSubjectiveAnswer: {
      type: String,
      default: "",
    },

    // -------- META INFO --------
    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      default: "MEDIUM",
    },

    topic: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Indexing
testQuestionSchema.index({ testId: 1 });
testQuestionSchema.index({ difficulty: 1 });
testQuestionSchema.index({ topic: 1 });

export const TestQuestion = mongoose.model("TestQuestion", testQuestionSchema);



// (Each Test contains multiple questions → MCQ / Subjective / True-False / Numeric)
// 🔥 This schema supports:

// ✔ MCQ
// ✔ True/False
// ✔ Subjective Q&A
// ✔ Numeric questions
// ✔ Difficulty tags
// ✔ Topic-based filtering
// ✔ Search + reports