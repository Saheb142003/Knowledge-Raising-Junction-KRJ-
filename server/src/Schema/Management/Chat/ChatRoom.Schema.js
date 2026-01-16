import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    // ---------------------------------------------------------
    // 1) ROOM TYPE
    // ---------------------------------------------------------
    roomType: {
      type: String,
      enum: ["PRIVATE", "GROUP", "BATCH_GROUP", "TEACHER_STUDENT"],
      required: true,
      index: true,
    },

    // ---------------------------------------------------------
    // 2) PARTICIPANTS (Users)
    // ---------------------------------------------------------
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    // For fast 1:1 unique room creation prevention
    participantHash: {
      type: String,
      index: true,
      default: null, // generated for PRIVATE rooms only
    },

    // ---------------------------------------------------------
    // 3) BATCH GROUP ROOM
    // ---------------------------------------------------------
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      default: null,
      index: true,
    },

    // ---------------------------------------------------------
    // 4) TEACHER ↔ STUDENT SPECIAL ROOM
    // ---------------------------------------------------------
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
      index: true,
    },

    // ---------------------------------------------------------
    // 5) GROUP NAME + ICON
    // ---------------------------------------------------------
    name: {
      type: String,
      trim: true,
      default: null,
    },

    icon: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: "",
    },

    // ---------------------------------------------------------
    // 6) GROUP ADMINS (ADDED)
    // ---------------------------------------------------------
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ---------------------------------------------------------
    // 7) MESSAGE META
    // ---------------------------------------------------------
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatMessage",
      default: null,
    },

    lastMessageAt: {
      type: Date,
      default: null,
      index: true,
    },

    // ---------------------------------------------------------
    // 8) NOTIFICATION / MUTE
    // ---------------------------------------------------------
    mutedBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        mutedAt: Date,
      },
    ],

    // ---------------------------------------------------------
    // 9) SECURITY / ACCESS CONTROL
    // ---------------------------------------------------------
    isLocked: {
      type: Boolean,
      default: false, // Admin can lock group chats
    },

    onlyAdminsCanPost: {
      type: Boolean,
      default: false, // Similar to WhatsApp "announcement-only" groups
    },

    // ---------------------------------------------------------
    // 10) STATUS
    // ---------------------------------------------------------
    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ---------------------------------------------------------
    // 11) AUDIT
    // ---------------------------------------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------------
// SPECIAL INDEXES
// ---------------------------------------------------------

// Faster search by participants
chatRoomSchema.index({ participants: 1 });

// Private chat unique prevention (using hash)
chatRoomSchema.index({ participantHash: 1 }, { sparse: true });

// Room type grouping
chatRoomSchema.index({ roomType: 1 });

// Batch rooms fast lookup
chatRoomSchema.index({ batchId: 1 });

// Teacher-student 1:1 special room
chatRoomSchema.index({ teacherId: 1, studentId: 1 });

// Last message sorting
chatRoomSchema.index({ lastMessageAt: -1 });

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
