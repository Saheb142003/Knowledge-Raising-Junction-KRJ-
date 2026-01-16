import mongoose from "mongoose";

const RoutineSlotSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1) MULTIPLE BATCHES (Your field kept)
    // -----------------------------------------------------
    batches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true,
        index: true,
      },
    ],

    // -----------------------------------------------------
    // 2) MULTIPLE TEACHERS (Your field kept)
    // -----------------------------------------------------
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
        index: true,
      },
    ],

    // -----------------------------------------------------
    // 3) SUBJECT (Your field kept)
    // -----------------------------------------------------
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },

    // -----------------------------------------------------
    // 4) DAY & TIME (Your fields kept)
    // -----------------------------------------------------
    day: {
      type: String,
      enum: [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ],
      required: true,
      index: true,
    },

    startTime: { type: String, required: true }, // HH:mm
    endTime: { type: String, required: true },

    // -----------------------------------------------------
    // 5) SPECIAL CLASS (Your field kept)
    // -----------------------------------------------------
    specificDate: {
      type: Date,
      default: null,
      index: true,
    },

    // -----------------------------------------------------
    // 6) MODE (Your field kept)
    // -----------------------------------------------------
    mode: {
      type: String,
      enum: ["OFFLINE", "ONLINE", "HYBRID"],
      default: "OFFLINE",
    },

    roomNumber: { type: String, default: "" },
    meetingLink: { type: String, default: "" },

    topic: { type: String, default: "" },

    // -----------------------------------------------------
    // 7) ATTENDANCE SESSION LINK (Your field kept)
    // -----------------------------------------------------
    attendanceSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AttendanceSession",
      default: null,
    },

    // -----------------------------------------------------
    // 8) STATUS (Your fields kept)
    // -----------------------------------------------------
    isCancelled: { type: Boolean, default: false },
    cancelReason: { type: String, default: "" },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

    // -----------------------------------------------------
    // 9) AUDIT FIELDS (Your fields kept)
    // -----------------------------------------------------
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

    // -----------------------------------------------------
    // 10) ADVANCED ADDITIONS (NEW)
    // -----------------------------------------------------

    // Prevent ROOM clash
    roomConflictCheck: {
      type: Boolean,
      default: true,
    },

    // Prevent STUDENT clash (if batch share students)
    studentConflictCheck: {
      type: Boolean,
      default: true,
    },

    // Prevent TEACHER clash
    teacherConflictCheck: {
      type: Boolean,
      default: true,
    },

    // Auto-generated slot type
    slotType: {
      type: String,
      enum: ["REGULAR", "SPECIAL", "REMEDIAL", "REVISION"],
      default: "REGULAR",
    },

    // Class duration (auto-calc)
    durationMinutes: {
      type: Number,
      default: 0,
    },

    // Notes or study material attached to slot
    materials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudyMaterial",
      },
    ],

    // After class feedback
    feedbackEnabled: {
      type: Boolean,
      default: false,
    },

    feedbackLogs: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// -----------------------------------------------------
// 11) INDEXES — SUPER OPTIMIZATION
// -----------------------------------------------------

// Teacher time clash prevention
RoutineSlotSchema.index(
  { teachers: 1, day: 1, startTime: 1, endTime: 1 },
  { unique: true }
);

// Room clash prevent
RoutineSlotSchema.index(
  { roomNumber: 1, day: 1, startTime: 1, endTime: 1 },
  { sparse: true }
);

// Batch-wise timetable quick fetch
RoutineSlotSchema.index({ batches: 1, day: 1 });

// Subject schedule fetch
RoutineSlotSchema.index({ subject: 1, day: 1 });

// Special classes
RoutineSlotSchema.index({ specificDate: 1 });

export const RoutineSlot = mongoose.model("RoutineSlot", RoutineSlotSchema);
