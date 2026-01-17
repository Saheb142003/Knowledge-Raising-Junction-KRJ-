import Joi from "joi";

/* -----------------------------------------------------
   1) COMMON HELPERS
----------------------------------------------------- */

export const objectId = Joi.string().hex().length(24).messages({
  "string.base": "ID must be a string",
  "string.hex": "ID must be a valid hexadecimal value",
  "string.length": "ID must be a valid 24-character ObjectId",
});

export const dateField = Joi.date().iso().messages({
  "date.base": "Value must be a valid ISO date",
  "date.format": "Date must be in ISO format",
});

export const booleanField = Joi.boolean().messages({
  "boolean.base": "Value must be true or false",
});

/* -----------------------------------------------------
   2) TARGET USER & BROADCAST SETTINGS
----------------------------------------------------- */

export const userId = objectId.required().messages({
  "any.required": "Target User ID is required",
});

export const targetType = Joi.string()
  .valid("USER", "BATCH", "BRANCH", "ROLE", "ALL")
  .default("USER")
  .messages({
    "any.only": "Target type must be USER, BATCH, BRANCH, ROLE, or ALL",
  });

export const targetRef = objectId.allow(null);

export const targetModel = Joi.string()
  .valid("Batch", "Branch", "User")
  .default("User");

/* -----------------------------------------------------
   3) NOTIFICATION TYPE & CONTENT
----------------------------------------------------- */

export const type = Joi.string()
  .valid(
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
    "OTHER"
  )
  .required()
  .messages({
    "any.only": "Invalid notification type",
    "any.required": "Notification type is required",
  });

export const message = Joi.string().trim().min(1).required().messages({
  "string.empty": "Message cannot be empty",
  "any.required": "Message is required",
});

export const meta = Joi.object().unknown().default({});

/* -----------------------------------------------------
   4) DELIVERY & DEVICE INFO
----------------------------------------------------- */

export const deliveryMethod = Joi.string()
  .valid("APP", "WEB", "EMAIL", "SMS", "WHATSAPP", "PUSH", "SYSTEM")
  .default("APP");

const deviceInfoSchema = Joi.object({
  deviceId: Joi.string().allow(""),
  os: Joi.string().allow(""),
  model: Joi.string().allow(""),
});

export const deviceInfo = deviceInfoSchema.default({});

/* -----------------------------------------------------
   5) PRIORITY & STATUS
----------------------------------------------------- */

export const priority = Joi.string()
  .valid("LOW", "NORMAL", "HIGH", "CRITICAL")
  .default("NORMAL");

export const status = Joi.string()
  .valid("SENT", "DELIVERED", "FAILED", "SCHEDULED")
  .default("SENT");

export const deliveredAt = dateField.allow(null);
export const failedReason = Joi.string().allow("");

/* -----------------------------------------------------
   6) READ STATUS
----------------------------------------------------- */

export const isRead = booleanField.default(false);
export const readAt = dateField.allow(null);

/* -----------------------------------------------------
   7) SCHEDULING
----------------------------------------------------- */

export const scheduleAt = dateField.allow(null);
export const expiresAt = dateField.allow(null);

/* -----------------------------------------------------
   8) ACTION / DEEPLINK
----------------------------------------------------- */

const actionSchema = Joi.object({
  label: Joi.string().allow(""),
  url: Joi.string().allow(""),
  payload: Joi.object().unknown().default({}),
});

export const action = actionSchema.default({});

/* -----------------------------------------------------
   9) AUDIT
----------------------------------------------------- */

export const isDeleted = booleanField;
export const deletedAt = dateField.allow(null);
export const deletedBy = objectId.allow(null);