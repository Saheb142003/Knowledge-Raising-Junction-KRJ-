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
   2) BASIC PLAN DETAILS
----------------------------------------------------- */

export const title = Joi.string().trim().min(3).max(100).required().messages({
  "string.empty": "Title is required",
  "string.min": "Title must be at least 3 characters",
  "string.max": "Title must not exceed 100 characters",
});

export const academicYear = Joi.string()
  .trim()
  .pattern(/^\d{4}-\d{4}$/) // Validates "2024-2025"
  .required()
  .messages({
    "string.pattern.base": "Academic year must be in format YYYY-YYYY (e.g., 2024-2025)",
    "any.required": "Academic year is required",
  });

export const course = Joi.string().trim().required().messages({
  "any.required": "Course name is required",
});

export const description = Joi.string().trim().max(1000).allow("").messages({
  "string.max": "Description must not exceed 1000 characters",
});

export const totalAmount = numberField.required().messages({
  "any.required": "Total amount is required",
});

export const allowInstallments = booleanField.default(true);

export const numberOfInstallments = Joi.number().integer().min(1).default(1);

export const lateFeePerDay = numberField.default(0);

/* -----------------------------------------------------
   3) PLAN CATEGORY
----------------------------------------------------- */

export const category = Joi.string()
  .valid("REGULAR", "DROPPER", "FOUNDATION", "ONLINE", "OTHER")
  .default("REGULAR")
  .messages({
    "any.only": "Invalid plan category selected",
  });

/* -----------------------------------------------------
   4) MAPPING (Components & Students)
----------------------------------------------------- */

export const components = idArray("Fee Components");
export const assignedStudents = idArray("Assigned Students");

/* -----------------------------------------------------
   5) ADVANCED SETTINGS
----------------------------------------------------- */

export const allowDiscount = booleanField.default(true);

export const maxDiscountPercent = Joi.number().min(0).max(100).default(0).messages({
  "number.max": "Discount percentage cannot exceed 100%",
});

export const taxPercentage = Joi.number().min(0).max(100).default(0).messages({
  "number.max": "Tax percentage cannot exceed 100%",
});

export const refundable = booleanField.default(true);

export const refundRules = Joi.string().trim().allow("").messages({
  "string.base": "Refund rules must be a string",
});

export const autoGenerateInstallments = booleanField.default(true);

/* -----------------------------------------------------
   6) META FIELDS
----------------------------------------------------- */

export const isActive = booleanField.default(true);
export const visibleToStudents = booleanField.default(false);
export const visibleOnWebsite = booleanField.default(false);

/* -----------------------------------------------------
   7) AUDIT
----------------------------------------------------- */

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);