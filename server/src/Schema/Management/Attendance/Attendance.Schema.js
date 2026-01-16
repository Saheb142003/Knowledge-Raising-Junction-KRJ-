import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    // ----------------------------------------------------
    // 1) WHOSE ATTENDANCE?  (Universal → Student/Teacher/Employee)
    // ----------------------------------------------------
    attendeeType: {
      type: String,
      enum: ["STUDENT", "TEACHER", "EMPLOYEE"],
      required: true,
      index: true,
    },

    attendeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    // ----------------------------------------------------
    // 2) CONTEXT (Student needs batch/subject, Staff does not)
    // ----------------------------------------------------
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      default: null,
      index: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
      index: true,
    },

    routineSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoutineSlot",
      default: null,
    },

    // ----------------------------------------------------
    // 3) ATTENDANCE INFO
    // ----------------------------------------------------
    date: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE"],
      required: true,
      index: true,
    },

    checkInTime: { type: Date, default: null },
    checkOutTime: { type: Date, default: null },

    // Auto calculated (if needed)
    lateByMinutes: { type: Number, default: 0 },

    // ----------------------------------------------------
    // 4) MARKED BY (Teacher/Admin/System)
    // ----------------------------------------------------
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    markedByType: {
      type: String,
      enum: ["TEACHER", "ADMIN", "SYSTEM"],
      default: "TEACHER",
    },

    // ----------------------------------------------------
    // 5) ATTENDANCE METHOD (QR, FACE, Manual etc.)
    // ----------------------------------------------------
    method: {
      type: String,
      enum: ["MANUAL", "QR", "FACE", "RFID", "AUTO"],
      default: "MANUAL",
    },

    deviceInfo: {
      ip: String,
      userAgent: String,
      location: String,
    },

    // ----------------------------------------------------
    // 6) EXTRA NOTES
    // ----------------------------------------------------
    remarks: {
      type: String,
      default: "",
    },

    // ----------------------------------------------------
    // 7) CORRECTION LOGS (For editing attendance)
    // ----------------------------------------------------
    correctionLogs: [
      {
        previousStatus: String,
        newStatus: String,
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
        changedAt: { type: Date, default: Date.now },
        remark: String,
      },
    ],

    // ----------------------------------------------------
    // 8) SOFT DELETE SUPPORT
    // ----------------------------------------------------
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

// ----------------------------------------------------
// BLOCK DUPLICATE ATTENDANCE FOR SAME PERSON SAME DAY
// ----------------------------------------------------
attendanceSchema.index(
  { attendeeType: 1, attendeeId: 1, date: 1 },
  { unique: true }
);

// Performance
attendanceSchema.index({ status: 1 });
attendanceSchema.index({ method: 1 });
attendanceSchema.index({ routineSlot: 1 });

export const Attendance = mongoose.model("Attendance", attendanceSchema);
