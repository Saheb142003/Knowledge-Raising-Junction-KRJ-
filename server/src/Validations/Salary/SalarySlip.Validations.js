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

export const payrollRun = objectId.required().messages({
  "any.required": "Payroll Run ID is required",
});

export const employeeId = objectId.allow(null).messages({
  "any.only": "Invalid Employee ID",
});

export const teacherId = objectId.allow(null).messages({
  "any.only": "Invalid Teacher ID",
});

export const branch = objectId.messages({
  "any.only": "Invalid Branch ID",
});

/* -----------------------------------------------------
   3) SALARY MONTH
----------------------------------------------------- */

export const month = Joi.string()
  .pattern(/^\d{4}-\d{2}$/) // Validates YYYY-MM
  .messages({
    "string.pattern.base": "Month must be in YYYY-MM format (e.g., 2026-01)",
  });

/* -----------------------------------------------------
   4) DAYS & ATTENDANCE SUMMARY
----------------------------------------------------- */

export const payableDays = numberField;
export const presentDays = numberField;
export const absentDays = numberField;
export const lateDays = numberField;
export const halfDays = numberField;
export const weeklyOffDays = numberField;
export const holidays = numberField;

/* -----------------------------------------------------
   5) COMPONENT SNAPSHOT
----------------------------------------------------- */

const componentSnapshotSchema = Joi.object({
  componentId: objectId.allow(null),
  name: Joi.string().required(),
  code: Joi.string().required(),
  type: Joi.string().valid("EARNING", "DEDUCTION").required(),
  calculationType: Joi.string().optional(), // FIXED, PERCENTAGE, etc.
  amount: numberField.required(),
  taxable: booleanField.default(false),
  remarks: Joi.string().allow("").optional(),
});

export const components = Joi.array().items(componentSnapshotSchema).messages({
  "array.base": "Components must be an array of component objects",
});

/* -----------------------------------------------------
   6) FINANCIAL TOTALS
----------------------------------------------------- */

export const totalEarnings = numberField;
export const totalDeductions = numberField;
export const netPay = numberField;

/* -----------------------------------------------------
   7) PAYMENT RECORD
----------------------------------------------------- */

export const paymentStatus = Joi.string()
  .valid("PENDING", "PROCESSING", "PAID", "FAILED")
  .default("PENDING")
  .messages({
    "any.only": "Payment status must be PENDING, PROCESSING, PAID, or FAILED",
  });

export const paidAt = dateField.allow(null);

export const transactionId = Joi.string().trim().allow(null, "").messages({
  "string.base": "Transaction ID must be a string",
});

export const paymentMethod = Joi.string()
  .valid("CASH", "UPI", "BANK_TRANSFER", "CHEQUE")
  .allow(null)
  .messages({
    "any.only": "Invalid payment method",
  });

/* -----------------------------------------------------
   8) TAXES & DEDUCTIONS
----------------------------------------------------- */

export const pfAmount = numberField;
export const esiAmount = numberField;
export const tdsAmount = numberField;
export const professionalTax = numberField;

/* -----------------------------------------------------
   9) TEACHER SPECIFIC
----------------------------------------------------- */

export const totalClassesTaken = numberField;
export const perClassRate = numberField;
export const classBasedEarnings = numberField;

const subjectTaughtSchema = Joi.object({
  subjectId: objectId.required(),
  classesTaken: numberField.required(),
});

export const subjectsTaught = Joi.array().items(subjectTaughtSchema).messages({
  "array.base": "Subjects taught must be an array of subject objects",
});

/* -----------------------------------------------------
   10) AUDIT & LOGS
----------------------------------------------------- */

export const remarks = Joi.string().trim().allow("").max(500).messages({
  "string.max": "Remarks cannot exceed 500 characters",
});

export const preparedBy = objectId;
export const approvedBy = objectId.allow(null);
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);