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

export const numberField = Joi.number().min(0).messages({
  "number.base": "Value must be a number",
  "number.min": "Value cannot be negative",
});

/* -----------------------------------------------------
   2) CHAT CONTEXT & SENDER
----------------------------------------------------- */

export const chatRoom = objectId.required().messages({
  "any.required": "Chat Room ID is required",
});

export const senderId = objectId.required().messages({
  "any.required": "Sender ID is required",
});

export const senderType = Joi.string()
  .valid("STUDENT", "TEACHER", "EMPLOYEE", "ADMIN")
  .required()
  .messages({
    "any.only": "Sender type must be STUDENT, TEACHER, EMPLOYEE, or ADMIN",
    "any.required": "Sender type is required",
  });

/* -----------------------------------------------------
   3) MESSAGE CONTENT & ATTACHMENTS
----------------------------------------------------- */

export const type = Joi.string()
  .valid("TEXT", "IMAGE", "VIDEO", "FILE", "AUDIO", "SYSTEM")
  .default("TEXT")
  .messages({
    "any.only": "Invalid message type",
  });

export const message = Joi.string().trim().allow("").max(5000).messages({
  "string.max": "Message content cannot exceed 5000 characters",
});

const attachmentItem = Joi.object({
  fileUrl: Joi.string().uri().required(),
  fileType: Joi.string().trim().allow(""),
  fileName: Joi.string().trim().allow(""),
  fileSize: numberField.optional(),
});

export const attachments = Joi.array().items(attachmentItem).messages({
  "array.base": "Attachments must be an array of file objects",
});

/* -----------------------------------------------------
   4) THREADING & REPLIES
----------------------------------------------------- */

export const replyTo = objectId.allow(null);

/* -----------------------------------------------------
   5) RECEIPTS (READ & DELIVERED)
----------------------------------------------------- */

const receiptItem = Joi.object({
  userId: objectId.required(),
  timestamp: dateField.default(Date.now), // Generic for readAt/deliveredAt
});

export const readBy = Joi.array().items(
  receiptItem.rename("timestamp", "readAt")
).messages({
  "array.base": "Read receipts must be an array",
});

export const deliveredTo = Joi.array().items(
  receiptItem.rename("timestamp", "deliveredAt")
).messages({
  "array.base": "Delivery receipts must be an array",
});

/* -----------------------------------------------------
   6) MESSAGE STATUS
----------------------------------------------------- */

export const status = Joi.string()
  .valid("SENT", "DELIVERED", "SEEN", "FAILED")
  .default("SENT");

/* -----------------------------------------------------
   7) EDITS & DELETION LOGIC
----------------------------------------------------- */

export const edited = booleanField.default(false);
export const editedAt = dateField.allow(null);

export const deletedForEveryone = booleanField.default(false);

const deletedForItem = Joi.object({
  userId: objectId.required(),
  deletedAt: dateField.default(Date.now),
});

export const deletedFor = Joi.array().items(deletedForItem);

/* -----------------------------------------------------
   8) REACTIONS & PINNING
----------------------------------------------------- */

const reactionItem = Joi.object({
  userId: objectId.required(),
  emoji: Joi.string().trim().required(),
  reactedAt: dateField.default(Date.now),
});

export const reactions = Joi.array().items(reactionItem);

export const isPinned = booleanField.default(false);
export const pinnedBy = objectId.allow(null);

/* -----------------------------------------------------
   9) AUDIT
----------------------------------------------------- */

export const isDeleted = booleanField.default(false);
export const deletedAt = dateField.allow(null);
export const deletedBy = objectId.allow(null);