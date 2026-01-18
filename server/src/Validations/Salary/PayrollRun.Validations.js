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
   2) PAYROLL PERIOD INFO
----------------------------------------------------- */

export const month = Joi.number().integer().min(1).max(12).messages({
  "number.min": "Month must be between 1 and 12",
  "number.max": "Month must be between 1 and 12",
});

export const year = Joi.number().integer().min(2000).max(2100).messages({
    "number.min": "Year must be a valid 4-digit year",
    "number.max": "Year must be a valid 4-digit year",
});

export const payrollType = Joi.string()
  .valid("MONTHLY", "WEEKLY", "CUSTOM")
  .default("MONTHLY")
  .messages({
    "any.only": "Payroll type must be MONTHLY, WEEKLY, or CUSTOM",
  });

export const periodStart = dateField;
export const periodEnd = dateField.min(Joi.ref('periodStart')).messages({
    "date.min": "Period end date must be after or equal to period start date"
});

/* -----------------------------------------------------
   3) BRANCH / ORGANIZATION CONTEXT
----------------------------------------------------- */

export const branch = objectId.messages({
  "any.only": "Invalid branch reference",
});

/* -----------------------------------------------------
   4) INCLUDED EMPLOYEES + TEACHERS
----------------------------------------------------- */

const idArray = (name) => Joi.array().items(objectId).unique().messages({
  "array.base": `${name} must be an array of ObjectIds`,
  "array.unique": `${name} cannot contain duplicate IDs`,
});

export const employeesIncluded = idArray("Included Employees");
export const teachersIncluded = idArray("Included Teachers");

/* -----------------------------------------------------
   5) ATTENDANCE SUMMARY
----------------------------------------------------- */

const attendanceSummarySchema = Joi.object({
    personType: Joi.string().valid("EMPLOYEE", "TEACHER").required(),
    personId: objectId.required(),
    totalPresent: numberField.default(0),
    totalAbsent: numberField.default(0),
    totalLeaves: numberField.default(0),
    totalWorkingDays: numberField.default(0),
    lateDays: numberField.default(0),
    halfDays: numberField.default(0),
});

export const attendanceSummary = Joi.array().items(attendanceSummarySchema).messages({
    "array.base": "Attendance summary must be an array of objects",
});

/* -----------------------------------------------------
   6) SALARY COMPONENTS
----------------------------------------------------- */

const salaryComponentSchema = Joi.object({
    componentId: objectId.allow(null),
    name: Joi.string().required(),
    type: Joi.string().valid("EARNING", "DEDUCTION").required(),
    amount: numberField.allow(null),
    formula: Joi.string().allow("").optional(), 
});

export const globalSalaryComponents = Joi.array().items(salaryComponentSchema).messages({
     "array.base": "Global salary components must be an array of objects",
});

/* -----------------------------------------------------
   7) PAYROLL TOTALS
----------------------------------------------------- */

export const totalEarnings = numberField;
export const totalDeductions = numberField;
export const netPayout = numberField;

/* -----------------------------------------------------
   8) REFERENCE LINKS (Slips & Payments)
----------------------------------------------------- */

export const salarySlips = idArray("Salary Slips");
export const paymentRefs = idArray("Payment References");

/* -----------------------------------------------------
   9) STATUS & PAYMENT STATUS
----------------------------------------------------- */

export const paymentStatus = Joi.string()
  .valid("PENDING", "PROCESSING", "PAID", "PARTIAL", "FAILED")
  .default("PENDING")
  .messages({
    "any.only": "Payment status must be valid",
  });

export const paymentProcessedAt = dateField.allow(null);

export const status = Joi.string()
  .valid("DRAFT", "REVIEW", "APPROVED", "REJECTED", "LOCKED")
  .default("DRAFT")
  .messages({
    "any.only": "Status must be valid",
  });

/* -----------------------------------------------------
   10) APPROVAL SYSTEM
----------------------------------------------------- */

export const approvedBy = objectId.allow(null);
export const approvedAt = dateField.allow(null);
export const rejectedBy = objectId.allow(null);
export const rejectionReason = Joi.string().trim().allow("").messages({
    "string.base": "Rejection reason must be a string",
});

/* -----------------------------------------------------
   11) FLAGS & REMARKS
----------------------------------------------------- */

export const autoCalculate = booleanField;
export const lockAfterApproval = booleanField;
export const remarks = Joi.string().trim().allow("").messages({
     "string.base": "Remarks must be a string",
});

/* -----------------------------------------------------
   12) AUDIT
----------------------------------------------------- */

export const createdBy = objectId;
export const updatedBy = objectId;
export const isDeleted = booleanField;
export const deletedBy = objectId.allow(null);