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
   2) CORE REFERENCES
----------------------------------------------------- */

export const studentId = objectId.required().messages({
  "any.required": "Student ID is required",
});

export const studentFeeId = objectId.required().messages({
  "any.required": "Student Fee Account ID is required",
});

export const installmentId = objectId.required().messages({
  "any.required": "Installment ID is required",
});

export const branch = objectId.required().messages({
  "any.required": "Branch reference is required",
});

/* -----------------------------------------------------
   3) DUE & PAYMENT DETAILS
----------------------------------------------------- */

export const dueAmount = numberField.required().messages({
  "any.required": "Due amount is required",
});

export const totalInstallmentAmount = numberField.required().messages({
  "any.required": "Total installment amount is required",
});

export const totalPaidAmount = numberField.default(0);

export const lateFeePerDay = numberField.default(0);

export const accumulatedLateFee = numberField.default(0);

export const finalPayableAmount = numberField.default(0);

/* -----------------------------------------------------
   4) DUE STATUS & DATES
----------------------------------------------------- */

export const dueDate = dateField.required().messages({
  "any.required": "Due date is required",
});

export const status = Joi.string()
  .valid("DUE", "PARTIALLY_PAID", "PAID", "OVERDUE")
  .default("DUE")
  .messages({
    "any.only": "Status must be DUE, PARTIALLY_PAID, PAID, or OVERDUE",
  });

export const isOverdue = booleanField.default(false);

export const overdueDays = Joi.number().integer().min(0).default(0);

export const lastUpdated = dateField.default(Date.now);

/* -----------------------------------------------------
   5) REMINDERS & NOTIFICATIONS
----------------------------------------------------- */

export const notified = booleanField.default(false);

export const lastReminderSentAt = dateField.allow(null);

export const reminderCount = Joi.number().integer().min(0).default(0);

const reminderLogItem = Joi.object({
  sentAt: dateField.default(Date.now),
  method: Joi.string().valid("SMS", "EMAIL", "WHATSAPP", "APP").required(),
  message: Joi.string().allow(""),
});

export const reminderLogs = Joi.array().items(reminderLogItem).messages({
  "array.base": "Reminder logs must be an array of objects",
});

/* -----------------------------------------------------
   6) META DATA
----------------------------------------------------- */

export const academicYear = Joi.string().trim().allow(null, "").messages({
  "string.base": "Academic year must be a string",
});

export const installmentName = Joi.string().trim().allow("").messages({
  "string.base": "Installment name must be a string",
});

export const remarks = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Remarks cannot exceed 500 characters",
});

/* -----------------------------------------------------
   7) AUDIT
----------------------------------------------------- */

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);
export const deletedBy = objectId.allow(null);