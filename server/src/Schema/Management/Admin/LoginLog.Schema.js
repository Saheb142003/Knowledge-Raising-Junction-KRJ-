/**
 * LoginLog Schema
 *
 * This schema tracks the login history of administrators.
 * It records the IP address, device information, and timestamp of each login.
 * Used for security auditing and monitoring account access.
 */

import mongoose from "mongoose";

const loginLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true,
    },
    ip: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      default: "Unknown",
    },
    loggedInAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS",
    },
    failureReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const LoginLog = mongoose.model("LoginLog", loginLogSchema);
