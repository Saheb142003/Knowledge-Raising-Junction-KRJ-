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

export const positiveNumber = Joi.number().min(0).messages({
  "number.base": "Value must be a number",
  "number.min": "Value cannot be negative",
});

export const booleanField = Joi.boolean().messages({
  "boolean.base": "Value must be true or false",
});

/* -----------------------------------------------------
   2) WHO PAID?
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
  "any.required": "Branch reference is required",
});

export const batch = objectId.allow(null);

/* -----------------------------------------------------
   4) PAYMENT DETAILS
----------------------------------------------------- */

export const amount = positiveNumber.required().messages({
  "any.required": "Payment amount is required",
});

export const currency = Joi.string().trim().length(3).uppercase().default("INR").messages({
  "string.length": "Currency must be a 3-letter ISO code (e.g., INR)",
});

export const paymentType = Joi.string()
  .valid("FEES", "SALARY", "INCENTIVE", "REFUND", "PENALTY", "PURCHASE")
  .required()
  .messages({
    "any.only": "Invalid payment type",
    "any.required": "Payment type is required",
  });

export const paymentMethod = Joi.string()
  .valid("CASH", "UPI", "CARD", "NET_BANKING", "CHEQUE", "ONLINE")
  .required()
  .messages({
    "any.only": "Invalid payment method",
    "any.required": "Payment method is required",
  });

export const transactionId = Joi.string().trim().allow(null, "").messages({
  "string.base": "Transaction ID must be a string",
});

export const status = Joi.string()
  .valid("PENDING", "SUCCESS", "FAILED", "REFUNDED", "PARTIAL")
  .default("SUCCESS")
  .messages({
    "any.only": "Invalid payment status",
  });

export const paymentDate = dateField.default(Date.now);

/* -----------------------------------------------------
   5) PAYMENT PROOF & CHEQUE
----------------------------------------------------- */

export const paymentProofUrl = Joi.string().uri().allow("").messages({
  "string.uri": "Payment proof must be a valid URL",
});

export const chequeNumber = Joi.string().trim().allow(null, "");

export const chequeStatus = Joi.string()
  .valid("PENDING", "CLEARED", "BOUNCED")
  .default("PENDING")
  .messages({
    "any.only": "Cheque status must be PENDING, CLEARED, or BOUNCED",
  });

/* -----------------------------------------------------
   6) ADVANCED ACCOUNTING
----------------------------------------------------- */

export const feeInstallment = objectId.allow(null);
export const feePlan = objectId.allow(null);
export const studentFeeId = objectId.allow(null);

const breakupItem = Joi.object({
  componentName: Joi.string().required(),
  amount: positiveNumber.required(),
});

export const breakup = Joi.array().items(breakupItem).messages({
  "array.base": "Breakup must be an array of component objects",
});

export const lateFee = positiveNumber.default(0);
export const discount = positiveNumber.default(0);
export const netAmount = positiveNumber.default(0);

/* -----------------------------------------------------
   7) ONLINE GATEWAY
----------------------------------------------------- */

export const gateway = Joi.string()
  .valid("RAZORPAY", "STRIPE", "PAYTM", "CASHFREE", "NONE")
  .default("NONE");

export const gatewayResponse = Joi.object().unknown().default({});

export const orderId = Joi.string().trim().allow(null, "");

/* -----------------------------------------------------
   8) REFUND SYSTEM
----------------------------------------------------- */

export const refundDetails = Joi.object({
  refunded: booleanField.default(false),
  refundAmount: positiveNumber.default(0),
  refundedAt: dateField.allow(null),
  refundTransactionId: Joi.string().allow(null, ""),
});

/* -----------------------------------------------------
   9) PERIOD
----------------------------------------------------- */

export const period = Joi.object({
  month: Joi.number().integer().min(1).max(12).required(),
  year: Joi.number().integer().min(2000).max(2100).required(),
}).messages({
  "object.base": "Period must be an object with month and year",
});

/* -----------------------------------------------------
   10) RECEIPTS
----------------------------------------------------- */

export const receiptNo = Joi.string().trim().allow(null, "");

export const receiptUrl = Joi.string().uri().allow("").messages({
  "string.uri": "Receipt URL must be valid",
});

/* -----------------------------------------------------
   11) AUDIT
----------------------------------------------------- */

export const remarks = Joi.string().trim().max(1000).allow("").messages({
  "string.max": "Remarks cannot exceed 1000 characters",
});

export const approvedBy = objectId.allow(null);
export const createdBy = objectId;
export const updatedBy = objectId;
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);