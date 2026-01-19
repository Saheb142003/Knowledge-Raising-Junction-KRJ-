import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["SUPER_ADMIN", "ADMIN", "BRANCH_ADMIN", "ACCOUNTANT", "HR", "TEACHER", "OTHER"],
      index: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default: null,
      index: true,
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      required: true,
    },

    route: {
      type: String,
      required: true,
      index: true,
    },

    params: {
      type: Object,
      default: {},
    },

    query: {
      type: Object,
      default: {},
    },

    body: {
      type: Object,
      default: {},
    },

    ip: {
      type: String,
      required: true,
    },

    userAgent: {
      type: String,
      default: "",
    },

    statusCode: {
      type: Number,
      default: 200,
    },

    success: {
      type: Boolean,
      default: true,
      index: true,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

/* ============================================================
   PERFORMANCE INDEXES
   ------------------------------------------------------------
   ➤ Fast filtering by user, role, branch, date, success
   ➤ Improve performance for admin audit screens
============================================================ */

AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ user: 1, createdAt: -1 });
AuditLogSchema.index({ branch: 1, createdAt: -1 });
AuditLogSchema.index({ role: 1, createdAt: -1 });

/* ============================================================
   MIDDLEWARE SAFE TRIMMER
   (Prevent huge payload logs)
============================================================ */
AuditLogSchema.pre("save", function (next) {
  try {
    if (this.body && JSON.stringify(this.body).length > 2000) {
      this.body = { truncated: true };
    }
  } catch (_) {}

  next();
});

export const AuditLog = mongoose.model("AuditLog", AuditLogSchema);
