/**
 * Permission Schema
 *
 * This schema defines the granular permissions available in the system.
 * Permissions control access to specific features or resources.
 */

import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true, // e.g., "manage_users", "view_reports"
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    module: {
      type: String, // e.g., "User Management", "Finance"
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Permission = mongoose.model("Permission", permissionSchema);
