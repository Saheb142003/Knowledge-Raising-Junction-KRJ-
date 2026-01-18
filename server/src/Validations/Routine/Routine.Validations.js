import Joi from "joi";

/* -----------------------------------------------------
   1) COMMON HELPERS
----------------------------------------------------- */

export const objectId = Joi.string().hex().length(24).messages({
  "string.base": "ID must be a string",
  "string.hex": "ID must be a valid hexadecimal value",
  "string.length": "ID must be a valid 24-character ObjectId",
});

export const booleanField = Joi.boolean().messages({
  "boolean.base": "Value must be true or false",
});

export const dateField = Joi.date().iso().messages({
  "date.base": "Value must be a valid ISO date",
  "date.format": "Date must be in ISO format",
});

/* -----------------------------------------------------
   2) CORE RELATIONSHIPS
----------------------------------------------------- */

export const batches = Joi.array().items(objectId).min(1).unique().messages({
  "array.base": "Batches must be an array of batch IDs",
  "array.min": "At least one batch is required",
  "array.unique": "Duplicate batches are not allowed",
});

export const teachers = Joi.array().items(objectId).min(1).unique().messages({
  "array.base": "Teachers must be an array of teacher IDs",
  "array.min": "At least one teacher is required",
  "array.unique": "Duplicate teachers are not allowed",
});

export const subject = objectId.required().messages({
  "any.required": "Subject is required for routine slot",
});

/* -----------------------------------------------------
   3) DAY & TIME
----------------------------------------------------- */

export const day = Joi.string()
  .valid(
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
  )
  .messages({
    "any.only": "Day must be a valid week day (e.g., MONDAY)",
  });

// HH:mm format pattern
export const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const startTime = Joi.string().pattern(timePattern).messages({
  "string.base": "Start time must be a string",
  "string.pattern.base": "Start time must be in HH:mm format (e.g., 09:30)",
});

export const endTime = Joi.string().pattern(timePattern).messages({
  "string.base": "End time must be a string",
  "string.pattern.base": "End time must be in HH:mm format (e.g., 10:30)",
});

export const specificDate = dateField.allow(null);

export const durationMinutes = Joi.number().integer().min(0).default(0);

/* -----------------------------------------------------
   4) MODE & LOCATION
----------------------------------------------------- */

export const mode = Joi.string()
  .valid("OFFLINE", "ONLINE", "HYBRID")
  .default("OFFLINE")
  .messages({
    "any.only": "Mode must be OFFLINE, ONLINE, or HYBRID",
  });

export const roomNumber = Joi.string().trim().max(20).allow("").messages({
  "string.max": "Room number must not exceed 20 characters",
});

export const meetingLink = Joi.string().uri().allow("").messages({
  "string.uri": "Meeting link must be a valid URL",
});

/* -----------------------------------------------------
   5) META & SLOT TYPE
----------------------------------------------------- */

export const topic = Joi.string().trim().max(200).allow("").messages({
  "string.max": "Topic must not exceed 200 characters",
});

export const slotType = Joi.string()
  .valid("REGULAR", "SPECIAL", "REMEDIAL", "REVISION")
  .default("REGULAR")
  .messages({
    "any.only": "Slot Type must be REGULAR, SPECIAL, REMEDIAL, or REVISION",
  });

/* -----------------------------------------------------
   6) CONFLICT FLAGS (New)
----------------------------------------------------- */

export const roomConflictCheck = booleanField.default(true);
export const studentConflictCheck = booleanField.default(true);
export const teacherConflictCheck = booleanField.default(true);

/* -----------------------------------------------------
   7) MATERIALS & ATTENDANCE
----------------------------------------------------- */

export const attendanceSession = objectId.allow(null);

export const materials = Joi.array().items(objectId).unique().messages({
  "array.base": "Materials must be an array of IDs",
});

/* -----------------------------------------------------
   8) STATUS & CANCELLATION
----------------------------------------------------- */

export const isCancelled = booleanField;

export const cancelReason = Joi.string().trim().allow("").messages({
  "string.base": "Cancel reason must be a string",
});

/* -----------------------------------------------------
   9) FEEDBACK SYSTEM
----------------------------------------------------- */

export const feedbackEnabled = booleanField;

const feedbackLogSchema = Joi.object({
  student: objectId.required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow(""),
  createdAt: dateField,
});

export const feedbackLogs = Joi.array().items(feedbackLogSchema).messages({
  "array.base": "Feedback logs must be an array of feedback objects",
});

/* -----------------------------------------------------
   10) AUDIT & ADMIN
----------------------------------------------------- */

export const isDeleted = booleanField;
export const deletedAt = dateField.allow(null);
export const deletedBy = objectId.allow(null);
export const createdBy = objectId;
export const updatedBy = objectId;