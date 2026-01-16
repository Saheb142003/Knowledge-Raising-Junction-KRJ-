import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    // -----------------------------
    // USER ACCOUNT LINK
    // -----------------------------
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // Employee record (optional)
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      unique: true,
      sparse: true,
    },

    // -----------------------------
    // ROLE & PERMISSIONS
    // -----------------------------
    role: {
      type: String,
      enum: ["super_admin", "manager", "editor", "viewer"],
      default: "manager",
      index: true,
    },

    permissions: [
      {
        type: String,
        enum: [
          "manage_users",
          "manage_teachers",
          "manage_employees",
          "manage_students",
          "manage_courses",
          "manage_payments",
          "manage_branches",
          "manage_batches",
          "manage_admins",
          "manage_schedule",
          "manage_content",
          "view_reports",
          "system_settings",
        ],
      },
    ],

    // Track when role updated
    roleUpdatedAt: {
      type: Date,
      default: null,
    },

    // -----------------------------
    // BRANCH & BATCH ACCESS
    // -----------------------------
    createdBranches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
      },
    ],

    managedBranches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        index: true,
      },
    ],

    createdBatches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
      },
    ],

    managedBatches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
      },
    ],

    // Parent admin in hierarchy
    managedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    // -----------------------------
    // NOTIFICATIONS
    // -----------------------------
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],

    // -----------------------------
    // ADMIN SETTINGS
    // -----------------------------
    settings: {
      theme: { type: String, default: "light" },
      emailNotifications: { type: Boolean, default: true },
      dashboardLayout: { type: mongoose.Schema.Types.Mixed, default: {} },
    },

    // -----------------------------
    // LOGGING
    // -----------------------------
    logs: [
      {
        action: { type: String, required: true },
        target: { type: String },
        timestamp: { type: Date, default: Date.now },
        details: { type: mongoose.Schema.Types.Mixed },
      },
    ],

    // OPTIONAL: Track changes
    updateLogs: [
      {
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
        change: mongoose.Schema.Types.Mixed,
      },
    ],

    // -----------------------------
    // STATUS
    // -----------------------------
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      index: true,
    },

    // NEW: login logs
    loginHistory: [
      {
        ip: String,
        device: String,
        loggedInAt: { type: Date, default: Date.now },
      },
    ],

    // -----------------------------
    // AUDIT FIELDS
    // -----------------------------
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedAt: { type: Date, default: null },
    jobApplications:[{
  type: mongoose.Schema.Types.ObjectId, ref: "JobApplication"
    }],
    studentApplications:[{
type: mongoose.Schema.Types.ObjectId, ref: "StudentApplication"
    }]
  },
  {
    timestamps: true,
  }
);

// --------------------------------
// INDEXES
// --------------------------------
adminSchema.index({ employeeId: 1 });
adminSchema.index({ managedBranches: 1 });
adminSchema.index({ managedBatches: 1 });
adminSchema.index({ role: 1 });
adminSchema.index({ isDeleted: 1 });

export const Admin = mongoose.model("Admin", adminSchema);
