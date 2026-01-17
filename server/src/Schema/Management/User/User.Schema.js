import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ------------------------------------------------------
    // 1) BASIC USER DETAILS
    // ------------------------------------------------------
    fullName: {
      type: String, 
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      index: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    // ------------------------------------------------------
    // 2) AUTHENTICATION
    // ------------------------------------------------------
    password: {
      type: String,
      required: true,
      select: false,
    },

    lastPasswordChange: {
      type: Date,
      default: null,
    },

    // Login security
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },

    lastLogin: {
      type: Date,
      default: null,
    },

    loginDevices: [
      {
        deviceId: String,
        ip: String,
        loggedInAt: Date,
      },
    ],

    // ------------------------------------------------------
    // 3) ROLE-BASED ACCESS
    // ------------------------------------------------------
    role: {
      type: String,
      enum: ["STUDENT", "TEACHER", "ADMIN"],
      required: true,
      index: true,
    },

    permissions: [
      {
        type: String,
      },
    ],

    // ------------------------------------------------------
    // 4) PROFILE RELATIONS
    // ------------------------------------------------------
    teacherProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    studentProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },

    adminProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null, // NEW
    },

    // ------------------------------------------------------
    // 5) ACCOUNT STATUS
    // ------------------------------------------------------
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "BLOCKED", "DELETED"],
      default: "ACTIVE",
    },

    // ------------------------------------------------------
    // 6) PASSWORD RESET + OTP + 2FA
    // ------------------------------------------------------
    resetToken: { type: String, select: false },
    resetTokenExpiry: { type: Date, select: false },

    otpCode: { type: String, select: false },
    otpExpiry: { type: Date, select: false },

    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, select: false },

    // ------------------------------------------------------
    // 7) ACTIVITY LOGS (NEW)
    // ------------------------------------------------------
    activityLogs: [
      {
        action: String,
        ip: String,
        device: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],

    // ------------------------------------------------------
    // 8) AUDIT + SOFT DELETE
    // ------------------------------------------------------
    deletedAt: { type: Date, default: null },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

// ------------------------------------------------------
// INDEXES
// ------------------------------------------------------
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ status: 1 });

export const User = mongoose.model("User", userSchema);
