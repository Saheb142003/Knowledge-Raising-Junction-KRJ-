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
   2) BRANCH WISE COUNTER
----------------------------------------------------- */

export const branch = objectId.required().messages({
  "any.required": "Branch ID is required",
});

/* -----------------------------------------------------
   3) RECEIPT FORMAT SETTINGS
----------------------------------------------------- */

export const prefix = Joi.string().trim().min(1).max(20).required().messages({
  "string.empty": "Prefix is required",
  "string.max": "Prefix must not exceed 20 characters",
  "any.required": "Prefix is required",
});

export const academicYear = Joi.string()
  .trim()
  .pattern(/^\d{4}-\d{4}$/) // Validates YYYY-YYYY format
  .allow(null, "")
  .messages({
    "string.pattern.base": "Academic year must be in format YYYY-YYYY",
  });

export const format = Joi.string()
  .trim()
  .default("{PREFIX}/{YEAR}/{SEQ}")
  .messages({
    "string.base": "Format string must be valid",
  });

/* -----------------------------------------------------
   4) RECEIPT SEQUENCE COUNTER
----------------------------------------------------- */

export const seq = numberField.default(0);

export const resetEveryYear = booleanField.default(true);

export const lastReceiptDate = dateField.allow(null);

/* -----------------------------------------------------
   5) PREVIEW & META
----------------------------------------------------- */

export const nextPreviewNumber = Joi.string().trim().allow(null, "").messages({
  "string.base": "Next preview number must be a string",
});

export const lastGeneratedReceipt = Joi.string().trim().allow(null, "").messages({
  "string.base": "Last generated receipt must be a string",
});

/* -----------------------------------------------------
   6) HISTORY LOGS
----------------------------------------------------- */

const historyItem = Joi.object({
  yearRange: Joi.string().pattern(/^\d{4}-\d{4}$/).allow(""),
  prefixUsed: Joi.string().allow(""),
  seqStart: numberField,
  seqEnd: numberField,
});

export const receiptPrefixHistory = Joi.array().items(historyItem).messages({
  "array.base": "Receipt prefix history must be an array of objects",
});

/* -----------------------------------------------------
   7) AUDIT
----------------------------------------------------- */

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);
export const deletedBy = objectId.allow(null);