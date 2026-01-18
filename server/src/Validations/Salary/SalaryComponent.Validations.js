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
   2) BASIC DETAILS
----------------------------------------------------- */

export const name = Joi.string().trim().min(2).max(100).messages({
  "string.base": "Name must be a string",
  "string.empty": "Name is required",
  "string.min": "Name must be at least 2 characters",
  "string.max": "Name must not exceed 100 characters",
});

export const code = Joi.string().trim().uppercase().min(2).max(50).messages({
  "string.base": "Code must be a string",
  "string.empty": "Code is required",
  "string.uppercase": "Code should be uppercase",
});

export const description = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Description must not exceed 500 characters",
});

/* -----------------------------------------------------
   3) TYPE & CALCULATION STRATEGY
----------------------------------------------------- */

export const type = Joi.string()
  .valid("EARNING", "DEDUCTION")
  .messages({
    "any.only": "Type must be either EARNING or DEDUCTION",
  });

export const calculationType = Joi.string()
  .valid(
    "FIXED",
    "PERCENTAGE",
    "FORMULA",
    "PER_DAY",
    "HOURLY",
    "CLASS_BASED"
  )
  .messages({
    "any.only": "Invalid calculation type selected",
  });

/* -----------------------------------------------------
   4) VALUES & FORMULAS
----------------------------------------------------- */

export const amount = numberField.default(0);

export const percentageOf = Joi.string()
  .valid("BASIC", "GROSS", "NET", "TOTAL_EARNINGS")
  .allow(null)
  .messages({
    "any.only": "Percentage base must be BASIC, GROSS, NET, or TOTAL_EARNINGS",
  });

export const formula = Joi.string().trim().allow(null, "").messages({
  "string.base": "Formula must be a string",
});

/* -----------------------------------------------------
   5) RULES & LIMITS
----------------------------------------------------- */

export const autoApply = booleanField;
export const minAmount = numberField.default(0);
export const maxAmount = numberField.allow(null); // Null implies no limit

export const isTaxable = booleanField;
export const taxExemptionLimit = numberField.default(0);

/* -----------------------------------------------------
   6) APPLICABILITY RULES
----------------------------------------------------- */

export const appliesTo = Joi.string()
  .valid("ALL", "EMPLOYEE", "TEACHER")
  .default("ALL")
  .messages({
    "any.only": "Applies to must be ALL, EMPLOYEE, or TEACHER",
  });

export const minExperienceRequired = numberField.default(0);

// Arrays of strings for designations and employment types
export const designationBased = Joi.array().items(Joi.string().trim()).messages({
  "array.base": "Designation based must be an array of strings",
});

export const employmentTypeBased = Joi.array()
  .items(Joi.string().valid("FULL_TIME", "PART_TIME", "CONTRACT"))
  .messages({
    "array.base": "Employment type based must be an array of valid types",
  });

/* -----------------------------------------------------
   7) ATTENDANCE & TEACHER LOGIC
----------------------------------------------------- */

export const dependsOnAttendance = booleanField;
export const absentDeductionPerDay = numberField;
export const latePenaltyPerDay = numberField;
export const halfDayCalculation = numberField;

export const perClassAmount = numberField;

const idArray = (name) =>
  Joi.array().items(objectId).unique().messages({
    "array.base": `${name} must be an array of ObjectIds`,
    "array.unique": `${name} cannot contain duplicate IDs`,
  });

export const classBasedSubjects = idArray("Class based subjects");

/* -----------------------------------------------------
   8) CATEGORY & SORTING
----------------------------------------------------- */

export const category = Joi.string()
  .valid(
    "BASIC",
    "ALLOWANCE",
    "DEDUCTION",
    "INCENTIVE",
    "BONUS",
    "PENALTY",
    "TAX",
    "OTHER"
  )
  .default("OTHER")
  .messages({
    "any.only": "Invalid category selected",
  });

export const sortOrder = Joi.number().integer().default(0);

/* -----------------------------------------------------
   9) STATUS & AUDIT
----------------------------------------------------- */

export const isActive = booleanField;

export const createdBy = objectId;
export const updatedBy = objectId;
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);