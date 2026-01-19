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

export const positiveNumber = Joi.number().min(0).messages({
  "number.base": "Value must be a number",
  "number.min": "Value cannot be negative",
});

/* -----------------------------------------------------
   2) APPLICANT CONTEXT
----------------------------------------------------- */

export const applicantId = objectId.required().messages({
  "any.required": "Applicant ID is required",
});

export const applicantType = Joi.string()
  .valid("STUDENT", "TEACHER", "EMPLOYEE")
  .required()
  .messages({
    "any.only": "Applicant type must be STUDENT, TEACHER, or EMPLOYEE",
    "any.required": "Applicant type is required",
  });

export const applicantTypeRef = Joi.string()
  .valid("Student", "Teacher", "Employee")
  .required()
  .messages({
    "any.only": "Applicant Type Ref must be Student, Teacher, or Employee",
  });

/* -----------------------------------------------------
   3) ORGANIZATION CONTEXT
----------------------------------------------------- */

export const branch = objectId.required().messages({
  "any.required": "Branch reference is required",
});

export const batch = objectId.allow(null); // Optional (Student only)
export const subject = objectId.allow(null); // Optional

/* -----------------------------------------------------
   4) LEAVE DETAILS
----------------------------------------------------- */

export const startDate = dateField.required().messages({
  "any.required": "Leave start date is required",
});

export const endDate = dateField.min(Joi.ref('startDate')).required().messages({
  "any.required": "Leave end date is required",
  "date.min": "End date cannot be before start date",
});

export const durationDays = Joi.number().min(0.5).required().messages({
  "any.required": "Leave duration (in days) is required",
  "number.min": "Duration must be at least half a day",
});

export const leaveType = Joi.string()
  .valid("CASUAL", "SICK", "PAID", "UNPAID", "EXAM", "PERSONAL", "OTHER")
  .default("OTHER")
  .messages({
    "any.only": "Invalid leave type selected",
  });

export const reason = Joi.string().trim().min(5).max(500).required().messages({
  "string.empty": "Leave reason is required",
  "string.min": "Leave reason must be at least 5 characters long",
  "string.max": "Leave reason must not exceed 500 characters",
});

export const attachment = Joi.string().uri().allow(null, "").messages({
  "string.uri": "Attachment must be a valid URL",
});

/* -----------------------------------------------------
   5) APPROVAL FLOW (MULTI-LEVEL)
----------------------------------------------------- */

export const status = Joi.string()
  .valid("PENDING", "APPROVED", "REJECTED", "CANCELLED")
  .default("PENDING")
  .messages({
    "any.only": "Status must be PENDING, APPROVED, REJECTED, or CANCELLED",
  });

export const approvedBy = objectId.allow(null);
export const approvalDate = dateField.allow(null);

export const rejectionReason = Joi.string().trim().allow("").messages({
  "string.base": "Rejection reason must be a string",
});

// Nested Approval Flow Schema
const approvalFlowItem = Joi.object({
  level: Joi.number().integer().min(1).required(),
  approver: objectId.allow(null),
  status: Joi.string().valid("PENDING", "APPROVED", "REJECTED").default("PENDING"),
  updatedAt: dateField.default(Date.now),
  remarks: Joi.string().allow(""),
});

export const approvalFlow = Joi.array().items(approvalFlowItem).messages({
  "array.base": "Approval flow must be an array of objects",
});

/* -----------------------------------------------------
   6) HR & PAYROLL BALANCE
----------------------------------------------------- */

export const leaveBalanceUsed = positiveNumber.default(0);
export const affectsPayroll = booleanField.default(false);

/* -----------------------------------------------------
   7) NOTIFICATIONS
----------------------------------------------------- */

export const notified = booleanField.default(false);

const notificationLogItem = Joi.object({
  sentAt: dateField.default(Date.now),
  method: Joi.string().valid("SMS", "EMAIL", "WHATSAPP", "APP").required(),
  message: Joi.string().allow(""),
});

export const notificationLogs = Joi.array().items(notificationLogItem).messages({
  "array.base": "Notification logs must be an array",
});

/* -----------------------------------------------------
   8) META & AUDIT
----------------------------------------------------- */

export const remarks = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Remarks must not exceed 500 characters",
});

export const isDeleted = booleanField;
export const deletedAt = dateField.allow(null);
export const deletedBy = objectId.allow(null);
export const createdBy = objectId;
export const updatedBy = objectId;