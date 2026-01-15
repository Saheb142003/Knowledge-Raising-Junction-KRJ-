import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    // Title of announcement
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Main Description
    message: {
      type: String,
      required: true,
    },

    // Who created this announcement?
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    // Target audience
    targetType: {
      type: String,
      enum: ["ALL", "STUDENT", "TEACHER", "EMPLOYEE", "CUSTOM"],
      default: "ALL",
    },

    // Custom target (e.g., branch or batch or specific group)
    targets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "targetsModel",
      },
    ],

    // Dynamic target model
    targetsModel: {
      type: String,
      enum: ["Student", "Teacher", "Employee", "Branch", "Batch"],
      default: "Student",
    },

    // Schedule Announcement
    scheduledAt: {
      type: Date,
      default: Date.now,
    },

    // Optional attachments
    attachments: [
      {
        fileUrl: String,
        fileName: String,
      },
    ],

    // Visibility
    isActive: {
      type: Boolean,
      default: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    // Soft delete
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster fetching
announcementSchema.index({ targetType: 1 });
announcementSchema.index({ createdBy: 1 });
announcementSchema.index({ scheduledAt: 1 });
announcementSchema.index({ expiresAt: 1 });

export const Announcement = mongoose.model(
  "Announcement",
  announcementSchema
);


// Here is the Announcement Schema — for notices, alerts, announcements to Students, Teachers, Employees, or entire Branch.

// (Useful for Notice Board, App Notifications, Website Banner)
// Features Supported

// Notice board for app & website

// Announcements for

// All users

// Students-only

// Teachers-only

// Employees-only

// Custom list (specific batches, branches)

// Push notification ready

// Attachments allowed

// Scheduled announcements

// Auto-expiry supported