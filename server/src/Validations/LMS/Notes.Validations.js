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

// Helper for arrays of ObjectIds
const idArray = (name) => Joi.array().items(objectId).unique().messages({
  "array.base": `${name} must be an array of IDs`,
  "array.unique": `${name} cannot contain duplicate IDs`,
});

/* -----------------------------------------------------
   2) BASIC DETAILS
----------------------------------------------------- */

export const title = Joi.string().trim().min(3).max(200).required().messages({
  "string.empty": "Title is required",
  "string.min": "Title must be at least 3 characters",
  "string.max": "Title must not exceed 200 characters",
});

export const content = Joi.string().required().messages({
  "string.empty": "Content is required",
  "any.required": "Content is required",
});

export const attachmentUrl = Joi.string().uri().allow(null, "").messages({
  "string.uri": "Attachment URL must be a valid URI",
});

/* -----------------------------------------------------
   3) ACADEMIC MAPPING
----------------------------------------------------- */

export const subject = objectId.required().messages({
  "any.required": "Subject ID is required",
});

export const batch = objectId.required().messages({
  "any.required": "Batch ID is required",
});

export const teacher = objectId.required().messages({
  "any.required": "Teacher ID is required",
});

export const chapter = Joi.string().trim().allow("");
export const topic = Joi.string().trim().allow("");

export const tags = Joi.array().items(Joi.string().trim()).unique().messages({
  "array.base": "Tags must be an array of strings",
});

/* -----------------------------------------------------
   4) ACCESS CONTROL
----------------------------------------------------- */

export const isImportant = booleanField.default(false);
export const isPublic = booleanField.default(false);

export const visibility = Joi.string()
  .valid("PUBLIC", "PRIVATE", "BATCH_ONLY", "SELECTED_STUDENTS")
  .default("BATCH_ONLY")
  .messages({
    "any.only": "Visibility must be PUBLIC, PRIVATE, BATCH_ONLY, or SELECTED_STUDENTS",
  });

export const allowedStudents = idArray("Allowed Students");

/* -----------------------------------------------------
   5) ANALYTICS & LOGS
----------------------------------------------------- */

export const views = numberField.default(0);

const viewLogItem = Joi.object({
  studentId: objectId.required(),
  viewedAt: dateField.default(Date.now),
  duration: numberField.default(0), // Time spent reading
});

export const viewLogs = Joi.array().items(viewLogItem);

export const averageReadTime = numberField.default(0);
export const readCompletionRate = Joi.number().min(0).max(100).default(0);

/* -----------------------------------------------------
   6) REVIEWS & FEEDBACK
----------------------------------------------------- */

const commentItem = Joi.object({
  studentId: objectId.required(),
  comment: Joi.string().trim().max(1000).required(),
  createdAt: dateField.default(Date.now),
});

export const comments = Joi.array().items(commentItem);

const ratingItem = Joi.object({
  studentId: objectId.required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  review: Joi.string().trim().max(1000).allow(""),
  createdAt: dateField.default(Date.now),
});

export const ratings = Joi.array().items(ratingItem);

export const averageRating = Joi.number().min(0).max(5).default(0);

/* -----------------------------------------------------
   7) VERSION CONTROL
----------------------------------------------------- */

export const version = Joi.number().integer().min(1).default(1);

const versionHistoryItem = Joi.object({
  version: Joi.number().required(),
  updatedAt: dateField,
  updatedBy: objectId, // Teacher ID
  changeSummary: Joi.string().allow(""),
});

export const versionHistory = Joi.array().items(versionHistoryItem);

/* -----------------------------------------------------
   8) ADMIN / META
----------------------------------------------------- */

export const isActive = booleanField.default(true);
export const isArchived = booleanField.default(false);

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);