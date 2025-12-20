import mongoose from "mongoose";
const TrackSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    date: Date,

    checkInTime: String,
    checkOutTime: String,
    breakTime: String,

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "HALF_DAY"],
    },
  },
  { timestamps: true }
);

export const Track = mongoose.model("Track", TrackSchema);
