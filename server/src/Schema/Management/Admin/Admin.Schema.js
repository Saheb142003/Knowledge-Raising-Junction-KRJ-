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
    // Can be string (enum) OR Ref to Role schema. Supporting both for backward compatibility or future migration.
    role: {
      type: String,
      enum: ["super_admin", "manager", "editor", "viewer"],
      default: "manager",
      index: true,
    },
    // Optional Ref if using dynamic roles
    roleRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },

    permissions: [
      {
        type: String, // Keeping string for now to avoid breaking Utils
      },
    ],
    // Optional Ref if using dynamic permissions
    permissionRefs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
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
    // Ref to SystemSetting or embedded object. Keeping embedded for simple per-admin settings,
    // but adding Ref for global/complex settings if needed.
    settings: {
      theme: { type: String, default: "light" },
      emailNotifications: { type: Boolean, default: true },
      dashboardLayout: { type: mongoose.Schema.Types.Mixed, default: {} },
    },

    systemSettings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SystemSetting",
      },
    ],

    // -----------------------------
    // LOGGING (Refs to new Schemas)
    // -----------------------------
    auditLogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuditLog",
      },
    ],

    loginLogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginLog",
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

    // -----------------------------
    // AUDIT FIELDS
    // -----------------------------
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedAt: { type: Date, default: null },

    jobApplications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobApplication",
      },
    ],
    studentApplications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentApplication",
      },
    ],
  },
  {
    timestamps: true,
  },
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
