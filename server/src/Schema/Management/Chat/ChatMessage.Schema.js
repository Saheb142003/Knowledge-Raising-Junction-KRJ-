import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    // ---------------------------------------------------------
    // 1) WHICH CHAT ROOM / GROUP / PRIVATE CHAT?
    // ---------------------------------------------------------
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
      index: true,
    },

    // ---------------------------------------------------------
    // 2) SENDER (Student/Teacher/Admin/Employee)
    // ---------------------------------------------------------
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    senderType: {
      type: String,
      enum: ["STUDENT", "TEACHER", "EMPLOYEE", "ADMIN"],
      required: true,
    },

    // ---------------------------------------------------------
    // 3) MESSAGE CONTENT
    // ---------------------------------------------------------
    type: {
      type: String,
      enum: ["TEXT", "IMAGE", "VIDEO", "FILE", "AUDIO", "SYSTEM"],
      default: "TEXT",
      index: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    // ---------------------------------------------------------
    // 4) ATTACHMENTS (Your existing idea improved)
    // ---------------------------------------------------------
    attachments: [
      {
        fileUrl: String,
        fileType: String, // pdf/png/jpg/doc/mp4 etc.
        fileName: String,
        fileSize: Number,
      },
    ],

    // ---------------------------------------------------------
    // 5) REPLY / THREAD SUPPORT (ADDED)
    // ---------------------------------------------------------
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatMessage",
      default: null,
    },

    // ---------------------------------------------------------
    // 6) READ RECEIPTS (WhatsApp style)
    // ---------------------------------------------------------
    readBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        readAt: { type: Date },
      },
    ],

    deliveredTo: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        deliveredAt: { type: Date },
      },
    ],

    // ---------------------------------------------------------
    // 7) MESSAGE STATUS (Sender-side)
    // ---------------------------------------------------------
    status: {
      type: String,
      enum: ["SENT", "DELIVERED", "SEEN", "FAILED"],
      default: "SENT",
      index: true,
    },

    // ---------------------------------------------------------
    // 8) EDIT & DELETE (ADDED PROFESSIONAL FEATURES)
    // ---------------------------------------------------------
    edited: {
      type: Boolean,
      default: false,
    },

    editedAt: {
      type: Date,
      default: null,
    },

    deletedForEveryone: {
      type: Boolean,
      default: false,
    },

    deletedFor: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        deletedAt: Date,
      },
    ],

    // ---------------------------------------------------------
    // 9) META INFORMATION
    // ---------------------------------------------------------
    reactions: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        emoji: String, // ❤️😂👍 etc.
        reactedAt: Date,
      },
    ],

    isPinned: {
      type: Boolean,
      default: false,
    },

    pinnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ---------------------------------------------------------
    // 10) AUDIT + SOFT DELETE
    // ---------------------------------------------------------
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
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------------
// INDEXES (For speed)
// ---------------------------------------------------------
chatMessageSchema.index({ chatRoom: 1, createdAt: 1 });
chatMessageSchema.index({ senderId: 1 });
chatMessageSchema.index({ type: 1 });
chatMessageSchema.index({ replyTo: 1 });

export const ChatMessage = mongoose.model(
  "ChatMessage",
  chatMessageSchema
);
