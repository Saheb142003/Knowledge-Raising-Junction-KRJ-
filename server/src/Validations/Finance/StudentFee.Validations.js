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

// Helper for arrays of objects wrapping an ID
const idWrapperArray = (wrapperKey, idField) => Joi.array().items(
  Joi.object({
    [idField]: objectId.required(),
  })
).unique((a, b) => a[idField] === b[idField]).messages({
  "array.base": `${wrapperKey} must be an array of objects`,
});

/* -----------------------------------------------------
   2) STUDENT & FEE PLAN
----------------------------------------------------- */

export const studentId = objectId.required().messages({
  "any.required": "Student ID is required",
});

export const feePlan = objectId.required().messages({
  "any.required": "Fee Plan ID is required",
});

export const academicYear = Joi.string()
  .trim()
  .pattern(/^\d{4}-\d{4}$/)
  .required()
  .messages({
    "string.pattern.base": "Academic year must be in format YYYY-YYYY",
    "any.required": "Academic year is required",
  });

/* -----------------------------------------------------
   3) FINANCIAL SUMMARY
----------------------------------------------------- */

export const totalPayable = numberField.required().messages({
  "any.required": "Total payable amount is required",
});

export const totalPaid = numberField.default(0);
export const totalDue = numberField.default(0);
export const totalDiscount = numberField.default(0);
export const totalFine = numberField.default(0);
export const totalLateFee = numberField.default(0);

export const lastPaymentDate = dateField.allow(null);

export const status = Joi.string()
  .valid("PAID", "PARTIAL", "UNPAID")
  .default("UNPAID")
  .messages({
    "any.only": "Status must be PAID, PARTIAL, or UNPAID",
  });

/* -----------------------------------------------------
   4) MAPPING (Installments & Payments)
----------------------------------------------------- */

// Matches schema: installments: [{ installmentId: ObjectId }]
export const installments = idWrapperArray("Installments", "installmentId");

// Matches schema: payments: [{ paymentId: ObjectId }]
export const payments = idWrapperArray("Payments", "paymentId");

/* -----------------------------------------------------
   5) DUE SUMMARY
----------------------------------------------------- */

export const nextDueInstallment = objectId.allow(null);
export const nextDueDate = dateField.allow(null);
export const isOverdue = booleanField.default(false);
export const overdueAmount = numberField.default(0);

/* -----------------------------------------------------
   6) DISCOUNT DETAILS
----------------------------------------------------- */

const discountDetailItem = Joi.object({
  discountType: Joi.string().trim().required(),
  amount: numberField.default(0),
  approvedBy: objectId.allow(null),
  remarks: Joi.string().allow(""),
});

export const discountDetails = Joi.array().items(discountDetailItem).messages({
  "array.base": "Discount details must be an array of objects",
});

export const scholarshipApplied = booleanField.default(false);

/* -----------------------------------------------------
   7) FEE LOGS
----------------------------------------------------- */

const feeLogItem = Joi.object({
  action: Joi.string().trim().required(),
  amount: numberField.required(),
  date: dateField.default(Date.now),
  refId: objectId.allow(null),
});

export const feeLogs = Joi.array().items(feeLogItem).messages({
  "array.base": "Fee logs must be an array of objects",
});

/* -----------------------------------------------------
   8) META & AUDIT
----------------------------------------------------- */

export const remarks = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Remarks cannot exceed 500 characters",
});

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);