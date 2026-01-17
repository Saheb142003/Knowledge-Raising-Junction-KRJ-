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

export const description = Joi.string().trim().max(2000).allow("").messages({
  "string.max": "Description must not exceed 2000 characters",
});

export const videoUrl = Joi.string().uri().required().messages({
  "string.uri": "Video URL must be a valid URI",
  "any.required": "Video URL is required",
});

export const thumbnailUrl = Joi.string().uri().allow("").messages({
  "string.uri": "Thumbnail URL must be a valid URI",
});

export const duration = numberField.required().messages({
  "any.required": "Duration (in seconds) is required",
});

/* -----------------------------------------------------
   3) ACADEMIC CONTEXT
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
   4) ACCESS CONTROLS
----------------------------------------------------- */

export const accessType = Joi.string()
  .valid("PAID", "FREE", "BATCH_ONLY")
  .default("BATCH_ONLY");

export const visibility = Joi.string()
  .valid("PUBLIC", "PRIVATE", "UNLISTED")
  .default("PRIVATE");

export const allowedStudents = idArray("Allowed Students");

export const isDownloadable = booleanField.default(false);

/* -----------------------------------------------------
   5) WATCH ANALYTICS
----------------------------------------------------- */

export const views = numberField.default(0);

const viewLogItem = Joi.object({
  studentId: objectId.required(),
  watchedAt: dateField.default(Date.now),
  durationWatched: numberField.default(0),
  completed: booleanField.default(false),
});

export const viewLogs = Joi.array().items(viewLogItem);

export const averageWatchTime = numberField.default(0);
export const watchCompletionRate = Joi.number().min(0).max(100).default(0);

/* -----------------------------------------------------
   6) VIDEO QUALITIES
----------------------------------------------------- */

const videoQualityItem = Joi.object({
  resolution: Joi.string().trim().required(), // e.g. "720p"
  url: Joi.string().uri().required(),
});

export const videoQualities = Joi.array().items(videoQualityItem);

/* -----------------------------------------------------
   7) COMMENTS & REVIEWS
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
   8) ADMIN / META
----------------------------------------------------- */

export const sequenceNumber = Joi.number().integer().min(0).default(1);

export const isActive = booleanField.default(true);
export const isArchived = booleanField.default(false);

export const createdBy = objectId;
export const updatedBy = objectId;
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);