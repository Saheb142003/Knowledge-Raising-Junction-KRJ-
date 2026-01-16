import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    // ------------------------------------
    // 1) BRANCH (Correct)
    // ------------------------------------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    // ------------------------------------
    // 2) BASIC DETAILS
    // ------------------------------------
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String, // e.g., KRJ-2025-JEE-01
      required: true,
      trim: true,
      unique: true,
      index: true,
    },

    // SESSION / YEAR (ADDED)
    academicYear: {
      type: String, // e.g., 2024-2025
      required: false,
      default: null,
      index: true,
    },

    // ------------------------------------
    // 3) ACTIVE PERIOD
    // ------------------------------------
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },

    // ------------------------------------
    // 4) TEACHERS / MENTORS
    // ------------------------------------
    mentors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],

    currentTeacherCount: { type: Number, default: 0 },
    teacherCapacity: { type: Number, default: 10 },

    // ------------------------------------
    // 5) STUDENTS
    // ------------------------------------
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    studentCapacity: { type: Number, default: 60 },
    currentStudentCount: { type: Number, default: 0 },

    // ------------------------------------
    // 6) SUBJECTS MAPPED TO THIS BATCH
    // ------------------------------------
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    // ------------------------------------
    // 7) ROUTINE / TIMETABLE
    // ------------------------------------
    routineSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoutineSlot",
      },
    ],

    // ------------------------------------
    // 8) ASSIGNMENTS
    // ------------------------------------
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],

    // ------------------------------------
    // 9) TESTS
    // ------------------------------------
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],

    // ------------------------------------
    // 🔥 ADDED: Attendance sessions (not individual attendance)
    // ------------------------------------
    attendanceSessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AttendanceSession",
      },
    ],

    // ------------------------------------
    // 🔥 ADDED: Timetable Meta
    // ------------------------------------
    timetableVersion: {
      type: Number,
      default: 1,
    },

    // ------------------------------------
    // 10) STATUS
    // ------------------------------------
    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },

    // ------------------------------------
    // AUDIT FIELDS
    // ------------------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    managedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

// ------------------------------------
// VIRTUALS
// ------------------------------------
batchSchema.virtual("remainingStudentCapacity").get(function () {
  return this.studentCapacity - this.currentStudentCount;
});

batchSchema.virtual("remainingTeacherCapacity").get(function () {
  return this.teacherCapacity - this.currentTeacherCount;
});

// ------------------------------------
// INDEXES
// ------------------------------------
batchSchema.index({ branch: 1, name: 1 });
batchSchema.index({ academicYear: 1 });
batchSchema.index({ mentors: 1 });
batchSchema.index({ subjects: 1 });
batchSchema.index({ students: 1 });
batchSchema.index({ routineSlots: 1 });
batchSchema.index({ assignments: 1 });
batchSchema.index({ tests: 1 });

export const Batch = mongoose.model("Batch", batchSchema);
