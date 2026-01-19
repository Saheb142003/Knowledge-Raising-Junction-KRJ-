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

// Helper for arrays of ObjectIds
const idArray = (name) => Joi.array().items(objectId).unique().messages({
  "array.base": `${name} must be an array of IDs`,
  "array.unique": `${name} cannot contain duplicate IDs`,
});

/* -----------------------------------------------------
   2) BASIC CONTENT
----------------------------------------------------- */

export const title = Joi.string().trim().min(3).max(200).required().messages({
  "string.empty": "Title is required",
  "string.min": "Title must be at least 3 characters",
  "string.max": "Title must not exceed 200 characters",
});

export const message = Joi.string().trim().min(1).required().messages({
  "string.empty": "Message is required",
});

export const previewImage = Joi.string().uri().allow(null, "").messages({
  "string.uri": "Preview image must be a valid URL",
});

/* -----------------------------------------------------
   3) CREATOR CONTEXT
----------------------------------------------------- */

export const createdBy = objectId.required().messages({
  "any.required": "CreatedBy (Admin ID) is required",
});

export const createdByUser = objectId.allow(null);

/* -----------------------------------------------------
   4) TARGET SYSTEM
----------------------------------------------------- */

export const targetType = Joi.string()
  .valid("ALL", "STUDENT", "TEACHER", "EMPLOYEE", "CUSTOM")
  .default("ALL")
  .messages({
    "any.only": "Target type must be ALL, STUDENT, TEACHER, EMPLOYEE, or CUSTOM",
  });

export const targets = idArray("Targets");

export const targetsModel = Joi.string()
  .valid("Student", "Teacher", "Employee", "Branch", "Batch")
  .default("Student");

/* -----------------------------------------------------
   5) TIMING & SCHEDULE
----------------------------------------------------- */

export const scheduledAt = dateField.default(Date.now);
export const expiresAt = dateField.allow(null);

/* -----------------------------------------------------
   6) STATUS & PRIORITY
----------------------------------------------------- */

export const isActive = booleanField.default(true);

export const status = Joi.string()
  .valid("PENDING", "SENT", "EXPIRED", "CANCELLED")
  .default("SENT");

export const priority = Joi.string()
  .valid("HIGH", "MEDIUM", "LOW")
  .default("MEDIUM");

export const category = Joi.string()
  .valid("EVENT", "NOTICE", "ALERT", "WARNING", "GENERAL")
  .default("GENERAL");

/* -----------------------------------------------------
   7) ATTACHMENTS
----------------------------------------------------- */

const attachmentItem = Joi.object({
  fileUrl: Joi.string().uri().required(),
  fileName: Joi.string().trim().required(),
  fileType: Joi.string()
    .valid("IMAGE", "PDF", "DOC", "ZIP", "OTHER")
    .default("OTHER"),
});

export const attachments = Joi.array().items(attachmentItem).messages({
  "array.base": "Attachments must be an array of file objects",
});

/* -----------------------------------------------------
   8) READ RECEIPTS
----------------------------------------------------- */

const readReceiptItem = Joi.object({
  userId: objectId.required(),
  readAt: dateField.default(Date.now),
});

export const readBy = Joi.array().items(readReceiptItem).messages({
  "array.base": "Read receipts must be an array of objects",
});

/* -----------------------------------------------------
   9) AUDIT
----------------------------------------------------- */

export const isDeleted = booleanField.default(false);
export const deletedAt = dateField.allow(null);