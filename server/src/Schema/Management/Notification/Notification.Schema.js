import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // ---------------------------------------------------
    // 1) TARGET USER (Your field kept)
    // ---------------------------------------------------
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ---------------------------------------------------
    // 2) TYPE OF NOTIFICATION (Your field kept)
    // ---------------------------------------------------
    type: {
      type: String,
      required: true,
      // examples:
      enum: [
        "SYSTEM",
        "ANNOUNCEMENT",
        "REMINDER",
        "PAYMENT",
        "ATTENDANCE",
        "ASSIGNMENT",
        "EXAM",
        "CHAT",
        "DOCUMENT",
        "LEAVE",
        "FEE_DUE",
        "OTHER",
      ],
      default: "SYSTEM",
    },

    // ---------------------------------------------------
    // 3) MESSAGE (Your field)
    // ---------------------------------------------------
    message: {
      type: String,
      required: true,
    },

    // ---------------------------------------------------
    // 4) META DATA (Your field)
    // ---------------------------------------------------
    meta: {
      type: Object,
      default: {},
    },

    // ---------------------------------------------------
    // 5) READ STATUS (Your field)
    // ---------------------------------------------------
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
      default: null,
    },

    // ---------------------------------------------------
    // 6) DEVICE & PLATFORM SUPPORT (NEW)
    // ---------------------------------------------------
    deliveryMethod: {
      type: String,
      enum: [
        "APP",
        "WEB",
        "EMAIL",
        "SMS",
        "WHATSAPP",
        "PUSH",
        "SYSTEM",
      ],
      default: "APP",
    },

    deviceInfo: {
      deviceId: String,
      os: String,
      model: String,
    },

    // ---------------------------------------------------
    // 7) MULTI-USER BROADCAST (NEW)
    // ---------------------------------------------------
    targetType: {
      type: String,
      enum: ["USER", "BATCH", "BRANCH", "ROLE", "ALL"],
      default: "USER",
      index: true,
    },

    targetRef: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "targetModel",
      default: null,
    },

    targetModel: {
      type: String,
      enum: ["Batch", "Branch", "User"],
      default: "User",
    },

    // ---------------------------------------------------
    // 8) PRIORITY LEVEL (NEW)
    // ---------------------------------------------------
    priority: {
      type: String,
      enum: ["LOW", "NORMAL", "HIGH", "CRITICAL"],
      default: "NORMAL",
      index: true,
    },

    // ---------------------------------------------------
    // 9) STATUS (NEW)
    // ---------------------------------------------------
    status: {
      type: String,
      enum: ["SENT", "DELIVERED", "FAILED", "SCHEDULED"],
      default: "SENT",
    },

    // Email/SMS delivery timestamps
    deliveredAt: {
      type: Date,
      default: null,
    },

    failedReason: {
      type: String,
      default: "",
    },

    // ---------------------------------------------------
    // 10) SCHEDULED NOTIFICATION SUPPORT (NEW)
    // ---------------------------------------------------
    scheduleAt: {
      type: Date,
      default: null,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    // ---------------------------------------------------
    // 11) ACTION BUTTON / DEEPLINK SUPPORT (NEW)
    // ---------------------------------------------------
    action: {
      label: String,
      url: String, // deep link or route
      payload: Object,
    },

    // ---------------------------------------------------
    // 12) SOFT DELETE + AUDIT
    // ---------------------------------------------------
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------
// INDEXES FOR HIGH PERFORMANCE
// ---------------------------------------------------
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ targetType: 1, priority: 1 });
notificationSchema.index({ scheduleAt: 1 });
notificationSchema.index({ expiresAt: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
