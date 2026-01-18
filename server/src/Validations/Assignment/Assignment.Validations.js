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
   2) ASSIGNMENT SCHEMA VALIDATION
----------------------------------------------------- */

export const batches = idArray("Batches").min(1).required().messages({
  "array.min": "At least one batch is required",
  "any.required": "Batches are required",
});

export const subject = objectId.required().messages({
  "any.required": "Subject reference is required",
});

export const createdBy = objectId.required().messages({
  "any.required": "Teacher reference (createdBy) is required",
});

export const title = Joi.string().trim().min(3).max(150).required().messages({
  "string.empty": "Assignment title is required",
  "string.min": "Assignment title must be at least 3 characters",
  "string.max": "Assignment title must not exceed 150 characters",
});

export const description = Joi.string().trim().max(2000).allow("").messages({
  "string.max": "Description must not exceed 2000 characters",
});

export const dueDate = dateField.required().messages({
  "any.required": "Due date is required",
});

export const maxMarks = numberField.default(100);

export const FileUrl = Joi.string().uri().allow("").messages({
  "string.uri": "File URL must be a valid URI",
});

export const submissions = idArray("Submissions");

/* -----------------------------------------------------
   3) SUBMISSION SCHEMA VALIDATION
----------------------------------------------------- */

export const assignment = objectId.required().messages({
  "any.required": "Assignment reference is required",
});

export const student = objectId.required().messages({
  "any.required": "Student reference is required",
});

export const batchId = objectId.allow(null);

export const submissionFileUrl = Joi.string().uri().required().messages({
  "string.uri": "Submission file URL must be a valid URI",
  "any.required": "Submission file is required",
});

// Attachments Array
const attachmentItem = Joi.object({
  fileUrl: Joi.string().uri().required(),
  fileName: Joi.string().trim().allow(""),
});

export const attachments = Joi.array().items(attachmentItem).messages({
  "array.base": "Attachments must be an array of file objects",
});

export const submittedAt = dateField.default(Date.now);

/* -----------------------------------------------------
   4) SUBMISSION META & HISTORY
----------------------------------------------------- */

export const isLate = booleanField.default(false);
export const lateByMinutes = numberField.default(0);
export const attemptNumber = Joi.number().integer().min(1).default(1);

const historyItem = Joi.object({
  fileUrl: Joi.string().uri().required(),
  submittedAt: dateField.required(),
  attemptNumber: Joi.number().integer().required(),
});

export const submissionHistory = Joi.array().items(historyItem);

/* -----------------------------------------------------
   5) EVALUATION & GRADING
----------------------------------------------------- */

export const marksObtained = numberField.allow(null);

export const teacherFeedback = Joi.string().trim().max(1000).allow("").messages({
  "string.max": "Teacher feedback must not exceed 1000 characters",
});

export const status = Joi.string()
  .valid("SUBMITTED", "GRADED", "LATE", "RESUBMISSION_REQUESTED")
  .default("SUBMITTED")
  .messages({
    "any.only": "Status must be SUBMITTED, GRADED, LATE, or RESUBMISSION_REQUESTED",
  });

export const evaluatedBy = objectId.allow(null);
export const evaluatedAt = dateField.allow(null);
export const plagiarismScore = Joi.number().min(0).max(100).allow(null);

/* -----------------------------------------------------
   6) AUDIT
----------------------------------------------------- */

export const isActive = booleanField.default(true);
export const isDeleted = booleanField.default(false);
export const deletedAt = dateField.allow(null);
export const deletedBy = objectId.allow(null);