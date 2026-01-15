import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    // Which Room?
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },

    // Sender
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // MESSAGE TYPE
    type: {
      type: String,
      enum: ["TEXT", "IMAGE", "FILE", "AUDIO", "VIDEO", "SYSTEM"],
      default: "TEXT",
    },

    // TEXT MESSAGE
    message: {
      type: String,
      trim: true,
    },

    // FILE URL (image, pdf, docs, audio, videos)
    fileUrl: {
      type: String,
      default: null,
    },

    // FILE META INFO
    fileMeta: {
      name: String,
      size: Number,
      mimeType: String,
    },

    // READ RECEIPTS
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    deliveredTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // MESSAGE STATUS
    status: {
      type: String,
      enum: ["SENT", "DELIVERED", "SEEN"],
      default: "SENT",
    },

    // Optional message deletion
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,

    // If a message is edited
    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: Date,
  },
  { timestamps: true }
);

// For faster chat queries
chatMessageSchema.index({ roomId: 1, createdAt: 1 });

// For fetching unread messages
chatMessageSchema.index({ senderId: 1, status: 1 });

export const ChatMessage = mongoose.model(
  "ChatMessage",
  chatMessageSchema
);


// ✔ This chat system supports

// One-to-one chat

// Group chat

// Batch chat

// Teacher ↔ Student chat

// Seen/delivered status

// File sharing (images, docs, audio, pdf)

// Message edit & delete

// Real-time Socket.IO ready

// Efficient indexing for fast chat loading