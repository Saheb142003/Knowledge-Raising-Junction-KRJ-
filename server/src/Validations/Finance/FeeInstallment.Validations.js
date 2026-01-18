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
   2) PARENT FEE ACCOUNT
----------------------------------------------------- */

export const studentFeeId = objectId.required().messages({
  "any.required": "Student Fee Account ID is required",
});

/* -----------------------------------------------------
   3) INSTALLMENT BASIC DETAILS
----------------------------------------------------- */

export const installmentName = Joi.string().trim().min(3).max(100).required().messages({
  "string.empty": "Installment name is required",
  "string.min": "Installment name must be at least 3 characters",
  "string.max": "Installment name must not exceed 100 characters",
});

export const dueDate = dateField.required().messages({
  "any.required": "Due date is required",
});

export const amount = numberField.required().messages({
  "any.required": "Installment amount is required",
});

export const paidAmount = numberField.default(0);

export const paymentStatus = Joi.string()
  .valid("PAID", "PARTIAL", "DUE", "OVERDUE")
  .default("DUE")
  .messages({
    "any.only": "Payment status must be PAID, PARTIAL, DUE, or OVERDUE",
  });

export const paymentDate = dateField.allow(null);

/* -----------------------------------------------------
   4) PAYMENT MAPPING
----------------------------------------------------- */

export const payments = idArray("Payments");

/* -----------------------------------------------------
   5) LATE FEE SYSTEM
----------------------------------------------------- */

export const lateFeePerDay = numberField.default(0);

export const overdueDays = Joi.number().integer().min(0).default(0);

export const accumulatedLateFee = numberField.default(0);

export const finalPayableAmount = numberField.default(0);

export const isOverdue = booleanField.default(false);

/* -----------------------------------------------------
   6) REMINDER SYSTEM
----------------------------------------------------- */

export const notified = booleanField.default(false);

export const lastReminderSentAt = dateField.allow(null);

export const reminderCount = Joi.number().integer().min(0).default(0);

const reminderLogItem = Joi.object({
  sentAt: dateField.default(Date.now),
  method: Joi.string().valid("SMS", "EMAIL", "WHATSAPP", "APP").required(),
  message: Joi.string().allow(""),
});

export const reminderLogs = Joi.array().items(reminderLogItem);

/* -----------------------------------------------------
   7) EXTRA META
----------------------------------------------------- */

export const academicYear = Joi.string().trim().allow(null, "").messages({
  "string.base": "Academic year must be a string",
});

export const feeComponentName = Joi.string().trim().allow("").messages({
  "string.base": "Fee component name must be a string",
});

export const remarks = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Remarks cannot exceed 500 characters",
});

/* -----------------------------------------------------
   8) AUDIT
----------------------------------------------------- */

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);