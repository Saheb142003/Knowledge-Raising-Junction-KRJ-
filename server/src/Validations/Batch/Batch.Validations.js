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
   2) BRANCH & BASIC DETAILS
----------------------------------------------------- */

export const branch = objectId.required().messages({
  "any.required": "Branch ID is required",
});

export const name = Joi.string().trim().min(2).max(100).required().messages({
  "string.empty": "Batch name is required",
  "string.min": "Batch name must be at least 2 characters",
  "string.max": "Batch name must not exceed 100 characters",
});

export const code = Joi.string()
  .trim()
  .pattern(/^KRJ-\d{4}-[A-Z0-9_-]+$/)
  .required()
  .messages({
    "string.empty": "Batch code is required",
    "string.pattern.base": "Batch code must follow format KRJ-YYYY-NAME (e.g. KRJ-2025-JEE-01)",
  });

export const academicYear = Joi.string().trim().pattern(/^\d{4}-\d{4}$/).allow(null, "").messages({
  "string.pattern.base": "Academic year must be in format YYYY-YYYY",
});

/* -----------------------------------------------------
   3) ACTIVE PERIOD
----------------------------------------------------- */

export const startDate = dateField.required().messages({
  "any.required": "Start date is required",
});

export const endDate = dateField.min(Joi.ref('startDate')).allow(null).messages({
  "date.min": "End date cannot be before start date",
});

/* -----------------------------------------------------
   4) TEACHERS & CAPACITY
----------------------------------------------------- */

export const mentors = idArray("Mentors");

export const teacherCapacity = numberField.default(10);
export const currentTeacherCount = numberField.default(0);

/* -----------------------------------------------------
   5) STUDENTS & CAPACITY
----------------------------------------------------- */

export const students = idArray("Students");

export const studentCapacity = numberField.default(60);
export const currentStudentCount = numberField.default(0);

/* -----------------------------------------------------
   6) ACADEMIC MAPPING
----------------------------------------------------- */

export const subjects = idArray("Subjects");
export const routineSlots = idArray("Routine Slots");
export const assignments = idArray("Assignments");
export const tests = idArray("Tests");
export const attendanceSessions = idArray("Attendance Sessions");

/* -----------------------------------------------------
   7) META & STATUS
----------------------------------------------------- */

export const timetableVersion = numberField.default(1);

export const isActive = booleanField.default(true);

/* -----------------------------------------------------
   8) AUDIT
----------------------------------------------------- */

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const managedBy = idArray("Managed By (Admins)");
export const deletedAt = dateField.allow(null);