import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    // ---------------------------
    // BASIC CONTENT
    // ---------------------------
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
    },

    // Optional preview image (for banners)
    previewImage: {
      type: String,
      default: null,
    },

    // ---------------------------
    // CREATED BY
    // ---------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    // NEW → Link to User (Teacher/Admin/Employee)
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ---------------------------
    // TARGET SYSTEM
    // ---------------------------
    targetType: {
      type: String,
      enum: ["ALL", "STUDENT", "TEACHER", "EMPLOYEE", "CUSTOM"],
      default: "ALL",
      index: true,
    },

    // CUSTOM TARGET SUPPORT
    targets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "targetsModel",
      },
    ],

    targetsModel: {
      type: String,
      enum: ["Student", "Teacher", "Employee", "Branch", "Batch"],
      default: "Student",
    },

    // ---------------------------
    // TIMING / SCHEDULE
    // ---------------------------
    scheduledAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    expiresAt: {
      type: Date,
      default: null,
      index: true,
    },

    // STATUS
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SENT", "EXPIRED", "CANCELLED"],
      default: "SENT",
    },

    // ---------------------------
    // ATTACHMENTS
    // ---------------------------
    attachments: [
      {
        fileUrl: String,
        fileName: String,
        fileType: {
          type: String,
          enum: ["IMAGE", "PDF", "DOC", "ZIP", "OTHER"],
          default: "OTHER",
        },
      },
    ],

    // ---------------------------
    // PRIORITY / CATEGORY
    // ---------------------------
    priority: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      default: "MEDIUM",
    },

    category: {
      type: String,
      enum: ["EVENT", "NOTICE", "ALERT", "WARNING", "GENERAL"],
      default: "GENERAL",
    },

    // ---------------------------
    // READ STATUS
    // ---------------------------
    readBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

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
  },
  { timestamps: true }
);

// ---------------------------
// INDEXES
// ---------------------------
announcementSchema.index({ targetType: 1 });
announcementSchema.index({ createdBy: 1 });
announcementSchema.index({ scheduledAt: 1 });
announcementSchema.index({ expiresAt: 1 });
announcementSchema.index({ priority: 1 });
announcementSchema.index({ category: 1 });

export const Announcement = mongoose.model(
  "Announcement",
  announcementSchema
);
