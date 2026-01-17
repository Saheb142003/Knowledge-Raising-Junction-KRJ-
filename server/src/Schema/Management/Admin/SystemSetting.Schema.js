/**
 * SystemSetting Schema
 *
 * This schema stores configuration settings for the Admin panel or the entire system.
 * It allows for dynamic configuration without code changes.
 * Can be global or per-admin depending on usage.
 */

import mongoose from "mongoose";

const systemSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed, // Can be string, number, boolean, or object
      required: true,
    },
    description: {
      type: String,
    },
    group: {
      type: String, // e.g., "General", "Security", "Notification"
      default: "General",
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: false, // If true, can be exposed to frontend without auth
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  },
);

export const SystemSetting = mongoose.model(
  "SystemSetting",
  systemSettingSchema,
);
