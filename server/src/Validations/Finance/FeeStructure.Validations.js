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
   2) LINKED FEE PLAN
----------------------------------------------------- */

export const feePlan = objectId.required().messages({
  "any.required": "Fee Plan ID is required",
});

/* -----------------------------------------------------
   3) COMPONENT DETAILS
----------------------------------------------------- */

export const componentName = Joi.string().trim().min(3).max(100).required().messages({
  "string.empty": "Component name is required",
  "string.min": "Component name must be at least 3 characters",
  "string.max": "Component name must not exceed 100 characters",
});

export const description = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Description must not exceed 500 characters",
});

export const amount = numberField.required().messages({
  "any.required": "Amount is required",
});

export const isOptional = booleanField.default(false);

/* -----------------------------------------------------
   4) DUE DATE & PAYMENT
----------------------------------------------------- */

export const dueDate = dateField.required().messages({
  "any.required": "Due date is required",
});

export const allowPartialPayment = booleanField.default(true);

/* -----------------------------------------------------
   5) LATE FEE RULES
----------------------------------------------------- */

export const lateFeePerDay = numberField.default(0);
export const maxLateFee = numberField.default(0);
export const gracePeriodDays = numberField.default(0);
export const autoLateFeeEnabled = booleanField.default(true);

/* -----------------------------------------------------
   6) DISCOUNT RULES
----------------------------------------------------- */

export const allowDiscount = booleanField.default(true);
export const maxDiscountPercent = Joi.number().min(0).max(100).default(0);
export const scholarshipEligible = booleanField.default(false);

/* -----------------------------------------------------
   7) INSTALLMENT MAPPING
----------------------------------------------------- */

export const installmentOrder = Joi.number().integer().min(1).default(1);
export const autoGenerateInstallment = booleanField.default(true);

/* -----------------------------------------------------
   8) META
----------------------------------------------------- */

export const academicYear = Joi.string().trim().pattern(/^\d{4}-\d{4}$/).allow(null, "").messages({
  "string.pattern.base": "Academic year must be in format YYYY-YYYY",
});

export const category = Joi.string()
  .valid("MANDATORY", "OPTIONAL", "SPECIAL")
  .default("MANDATORY")
  .messages({
    "any.only": "Category must be MANDATORY, OPTIONAL, or SPECIAL",
  });

export const applicableForCourse = Joi.string().trim().allow("").messages({
  "string.base": "Applicable course must be a string",
});

export const remarks = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Remarks cannot exceed 500 characters",
});

/* -----------------------------------------------------
   9) AUDIT
----------------------------------------------------- */

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);