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
   2) STUDENT LINK
----------------------------------------------------- */

export const studentId = objectId.required().messages({
  "any.required": "Student reference is required",
});

/* -----------------------------------------------------
   3) CURRENT ACADEMIC YEAR
----------------------------------------------------- */

export const academicYear = Joi.string()
  .trim()
  .pattern(/^\d{4}-\d{4}$/)
  .required()
  .messages({
    "string.empty": "Academic year is required",
    "string.pattern.base": "Academic year must be in format YYYY-YYYY (e.g. 2024-2025)",
  });

export const currentClassYear = Joi.string().trim().min(1).max(20).required().messages({
  "string.empty": "Current class/year is required",
  "string.max": "Current class/year must not exceed 20 characters",
});

export const board = objectId.required().messages({
  "any.required": "Board reference is required",
});

export const course = objectId.required().messages({
  "any.required": "Course reference is required",
});

export const medium = Joi.string()
  .valid("ENGLISH", "HINDI", "BENGALI", "ODIA", "OTHER")
  .required()
  .messages({
    "any.only": "Medium must be ENGLISH, HINDI, BENGALI, ODIA, or OTHER",
    "any.required": "Medium is required",
  });

/* -----------------------------------------------------
   4) PREVIOUS ACADEMIC HISTORY
----------------------------------------------------- */

const previousAcademicRecord = Joi.object({
  academicYear: Joi.string().trim().pattern(/^\d{4}-\d{4}$/).allow(""),
  classYear: Joi.string().trim().max(20).allow(""),
  board: objectId.allow(null),
  schoolOrCollegeName: Joi.string().trim().max(200).allow(""),
  
  marksObtained: numberField.allow(null),
  totalMarks: numberField.allow(null),
  percentage: Joi.number().min(0).max(100).allow(null),
  
  resultStatus: Joi.string()
    .valid("PASS", "FAIL", "APPEARING")
    .default("APPEARING"),
    
  medium: Joi.string()
    .valid("ENGLISH", "HINDI", "BENGALI", "ODIA", "OTHER")
    .allow(null, ""),
    
  grade: Joi.string().trim().max(10).allow(""),
  documentUrl: Joi.string().uri().allow(null, ""),
  remarks: Joi.string().trim().max(500).allow(""),
});

export const previousAcademics = Joi.array().items(previousAcademicRecord).messages({
  "array.base": "Previous academics must be an array of records",
});

/* -----------------------------------------------------
   5) META & AUDIT
----------------------------------------------------- */

export const remarks = Joi.string().trim().max(1000).allow("").messages({
  "string.max": "Remarks must not exceed 1000 characters",
});

export const isActive = booleanField.default(true);

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);