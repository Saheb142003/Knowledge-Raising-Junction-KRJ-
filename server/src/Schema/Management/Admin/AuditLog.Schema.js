/**
 * AuditLog Schema
 *
 * This schema records significant actions taken by administrators.
 * It tracks who did what, when, and to which target.
 * Essential for accountability and tracing system changes.
 */

import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      index: true,
    },
    target: {
      type: String, // e.g., "User:123", "SystemSettings"
      index: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed, // Flexible object for storing changed values, diffs, etc.
    },
    ip: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
