import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    // Who is marked present/absent
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

    // Context
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      default: null, // Mainly for students
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
    },

    // Attendance info
    date: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE"],
      required: true,
    },

    checkInTime: {
      type: Date,
      default: null,
    },

    checkOutTime: {
      type: Date,
      default: null,
    },

    // Optional metadata
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "Teacher", // teacher/admin who marked attendance
      required: true,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Prevent duplicate attendance for same person on same day
attendanceSchema.index(
  { attendeeType: 1, attendeeId: 1, date: 1 },
  { unique: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
