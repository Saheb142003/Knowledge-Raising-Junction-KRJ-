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
   2) WHO MADE THE PAYMENT
----------------------------------------------------- */

export const paidByType = Joi.string()
  .valid("STUDENT", "EMPLOYEE")
  .required()
  .messages({
    "any.only": "Payer type must be STUDENT or EMPLOYEE",
    "any.required": "Payer type is required",
  });

export const paidById = objectId.required().messages({
  "any.required": "Payer ID is required",
});

export const student = objectId.allow(null);
export const employee = objectId.allow(null);

/* -----------------------------------------------------
   3) CONTEXT
----------------------------------------------------- */

export const branch = objectId.required().messages({
  "any.required": "Branch ID is required",
});

export const batch = objectId.allow(null);

export const studentFeeId = objectId.allow(null);

export const installmentId = objectId.allow(null);

/* -----------------------------------------------------
   4) PAYMENT DETAILS
----------------------------------------------------- */

export const amount = numberField.required().messages({
  "any.required": "Amount is required",
});

export const currency = Joi.string().trim().length(3).uppercase().default("INR");

export const paymentType = Joi.string()
  .valid("FEES", "SALARY", "INCENTIVE", "REFUND", "PENALTY", "PURCHASE")
  .required()
  .messages({
    "any.only": "Invalid payment type",
    "any.required": "Payment type is required",
  });

export const paymentMethod = Joi.string()
  .valid("CASH", "UPI", "CARD", "NET_BANKING", "CHEQUE")
  .required()
  .messages({
    "any.only": "Invalid payment method",
    "any.required": "Payment method is required",
  });

export const transactionId = Joi.string().trim().allow(null, "").messages({
  "string.base": "Transaction ID must be a string",
});

export const utrNumber = Joi.string().trim().allow(null, "").messages({
  "string.base": "UTR number must be a string",
});

export const status = Joi.string()
  .valid("PENDING", "SUCCESS", "FAILED", "REFUNDED")
  .default("SUCCESS")
  .messages({
    "any.only": "Status must be PENDING, SUCCESS, FAILED, or REFUNDED",
  });

export const paymentDate = dateField.default(Date.now);

/* -----------------------------------------------------
   5) LATE FEES & ADJUSTMENTS
----------------------------------------------------- */

export const lateFee = numberField.default(0);
export const discount = numberField.default(0);
export const fine = numberField.default(0);
export const adjustedAmount = numberField.default(0);

/* -----------------------------------------------------
   6) RECEIPT & INVOICE
----------------------------------------------------- */

export const receiptNumber = Joi.string().trim().allow(null, "");

export const receiptGenerated = booleanField.default(false);

export const remarkNote = Joi.string().trim().allow("").messages({
  "string.base": "Remark note must be a string",
});

/* -----------------------------------------------------
   7) FISCAL PERIOD
----------------------------------------------------- */

export const period = Joi.object({
  month: Joi.number().integer().min(1).max(12).messages({
    "number.min": "Month must be between 1 and 12",
    "number.max": "Month must be between 1 and 12",
  }),
  year: Joi.number().integer().min(2000).max(2100).messages({
    "number.min": "Year must be a valid 4-digit year",
    "number.max": "Year must be a valid 4-digit year",
  }),
}).messages({
  "object.base": "Period must be an object with month and year",
});

/* -----------------------------------------------------
   8) AUDIT
----------------------------------------------------- */

export const remarks = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Remarks cannot exceed 500 characters",
});

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);