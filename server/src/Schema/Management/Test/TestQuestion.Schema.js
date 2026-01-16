import mongoose from "mongoose";

const testQuestionSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1) LINKED TEST
    // -----------------------------------------------------
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
      index: true,
    },

    // -----------------------------------------------------
    // 2) QUESTION BASIC INFO
    // -----------------------------------------------------
    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    questionImage: {
      type: String,
      default: null,   // NEW: For image-based questions
    },

    questionType: {
      type: String,
      enum: ["MCQ", "TRUE_FALSE", "SUBJECTIVE", "NUMERIC"],
      required: true,
      index: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
    },

    negativeMarks: {
      type: Number,
      default: 0,       // NEW: per question negative marking
    },

    // -----------------------------------------------------
    // 3) MCQ OPTIONS
    // -----------------------------------------------------
    options: [
      {
        optionText: String,
        optionImage: String, // NEW
        isCorrect: Boolean,
      },
    ],

    // -----------------------------------------------------
    // 4) TRUE / FALSE
    // -----------------------------------------------------
    correctBooleanAnswer: {
      type: Boolean,
      default: null,
    },

    // -----------------------------------------------------
    // 5) NUMERIC ANSWER
    // -----------------------------------------------------
    correctNumericAnswer: {
      type: Number,
      default: null,
    },

    // -----------------------------------------------------
    // 6) SUBJECTIVE ANSWER
    // -----------------------------------------------------
    correctSubjectiveAnswer: {
      type: String,
      default: "",
    },

    subjectiveEvaluationGuide: {
      type: String,
      default: "", // NEW — helps teacher evaluation
    },

    maxWordLimit: {
      type: Number,
      default: null, // NEW
    },

    // -----------------------------------------------------
    // 7) META: Difficulty / Topic / Chapter
    // -----------------------------------------------------
    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      default: "MEDIUM",
      index: true,
    },

    topic: {
      type: String,
      default: "",
      index: true,
    },

    chapter: {
      type: String,
      default: "",      // NEW: useful for chapter-test analytics
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // -----------------------------------------------------
    // 8) ONLINE EXAM CONTROLS
    // -----------------------------------------------------
    shuffleOptions: {
      type: Boolean,
      default: true,
    },

    timeLimitSeconds: {
      type: Number,
      default: null, // NEW — per-question timer
    },

    mandatory: {
      type: Boolean,
      default: false,   // NEW — must attempt question
    },

    // -----------------------------------------------------
    // 9) AUTHOR & AUDIT
    // -----------------------------------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

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
  },
  { timestamps: true }
);

// -----------------------------------------------------
// INDEXES
// -----------------------------------------------------
testQuestionSchema.index({ testId: 1 });
testQuestionSchema.index({ difficulty: 1 });
testQuestionSchema.index({ topic: 1 });
testQuestionSchema.index({ chapter: 1 });
testQuestionSchema.index({ questionType: 1 });
testQuestionSchema.index({ isActive: 1 });

export const TestQuestion = mongoose.model("TestQuestion", testQuestionSchema);
