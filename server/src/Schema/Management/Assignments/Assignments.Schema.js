import mongoose from "mongoose";

/* ------------------------------------------------------------------
   ASSIGNMENT SCHEMA
------------------------------------------------------------------ */
const assignmentSchema = new mongoose.Schema(
  {
    batches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true,
        index: true,
      },
    ],

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    dueDate: {
      type: Date,
      required: true,
      index: true,
    },

    maxMarks: {
      type: Number,
      default: 100,
    },

    FileUrl: {
      type: String,
    },

    // Linked submissions
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
        required: false,
      },
    ],

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


/* ------------------------------------------------------------------
   SUBMISSION SCHEMA (FIXED + IMPROVED)
------------------------------------------------------------------ */
const submissionSchema = new mongoose.Schema(
  {
    // ---------------------------
    // RELATIONSHIPS
    // ---------------------------
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
      index: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    // NEW → Batch mapping for filtering
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      index: true,
      default: null,
    },

    // ---------------------------
    // SUBMISSION DETAILS
    // ---------------------------
    submissionFileUrl: {
      type: String,
      required: true,
    },

    // NEW → Multi-file upload support
    attachments: [
      {
        fileUrl: String,
        fileName: String,
      },
    ],

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    // NEW → LATE SUBMISSION LOGIC
    isLate: {
      type: Boolean,
      default: false,
      index: true,
    },

    lateByMinutes: {
      type: Number,
      default: 0,
    },

    // NEW → SUPPORT MULTIPLE ATTEMPTS
    attemptNumber: {
      type: Number,
      default: 1,
    },

    submissionHistory: [
      {
        fileUrl: String,
        submittedAt: Date,
        attemptNumber: Number,
      },
    ],

    // ---------------------------
    // EVALUATION
    // ---------------------------
    marksObtained: {
      type: Number,
      default: null,
    },

    teacherFeedback: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["SUBMITTED", "GRADED", "LATE", "RESUBMISSION_REQUESTED"],
      default: "SUBMITTED",
      index: true,
    },

    evaluatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    evaluatedAt: {
      type: Date,
      default: null,
    },

    plagiarismScore: {
      type: Number,
      default: null,
    },

    // ---------------------------
    // SOFT DELETE
    // ---------------------------
    isDeleted: {
      type: Boolean,
      default: false,
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


// Prevent duplicate submission for same assignment
submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

// Extra indexing
submissionSchema.index({ batchId: 1 });
submissionSchema.index({ isLate: 1 });
submissionSchema.index({ status: 1 });


export const Assignment = mongoose.model("Assignment", assignmentSchema);
export const Submission = mongoose.model("Submission", submissionSchema);
