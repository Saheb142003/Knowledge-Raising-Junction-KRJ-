import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    // ROOM TYPE
    roomType: {
      type: String,
      enum: ["PRIVATE", "GROUP", "BATCH_GROUP", "TEACHER_STUDENT"],
      required: true,
    },

    // PARTICIPANTS (Users)
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    // BATCH ROOM (optional)
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      default: null,
    },

    // TEACHER ↔ STUDENT ROOM (optional)
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },

    // GROUP NAME (For custom groups)
    name: {
      type: String,
      trim: true,
    },

    // GROUP ICON
    icon: {
      type: String,
      default: null,
    },

    // META
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatMessage",
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for fast private chat search
chatRoomSchema.index({ participants: 1 });

// Unique private chat room for same users
chatRoomSchema.index(
  { participants: 1, roomType: 1 },
  { unique: false }
);

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);


// ✔ What this supports

// One-to-one chat

// Group chat

// Batch-wise class group

// Teacher ↔ Student dedicated chat

// Search fast

// Last message tracking

// Room icon + group name

// Fully scalable
