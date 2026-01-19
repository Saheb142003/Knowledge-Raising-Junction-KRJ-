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
   2) CORE REFERENCES
----------------------------------------------------- */

export const userId = objectId.required().messages({
  "any.required": "User ID is required for employee profile",
});

export const idCard = objectId.required().messages({
  "any.required": "ID card reference is required",
});

/* -----------------------------------------------------
   3) BASIC EMPLOYEE INFO
----------------------------------------------------- */

export const employeeCode = Joi.string()
  .trim()
  // Pattern based on your example: KRJ-EMP-2025-001
  .pattern(/^KRJ-EMP-\d{4}-\d{3}$/)
  .required()
  .messages({
    "string.base": "Employee code must be a string",
    "string.empty": "Employee code is required",
    "string.pattern.base":
      "Employee code must be in format KRJ-EMP-YYYY-XXX (e.g. KRJ-EMP-2025-001)",
  });

export const designation = Joi.string().trim().min(2).max(50).required().messages({
  "string.empty": "Designation is required",
  "string.min": "Designation must be at least 2 characters",
  "string.max": "Designation must not exceed 50 characters",
});

export const department = Joi.string().trim().min(2).max(50).required().messages({
  "string.empty": "Department is required",
  "string.min": "Department must be at least 2 characters",
  "string.max": "Department must not exceed 50 characters",
});

export const employmentType = Joi.string()
  .valid("FULL_TIME", "PART_TIME", "CONTRACT")
  .default("FULL_TIME")
  .messages({
    "any.only": "Employment type must be FULL_TIME, PART_TIME, or CONTRACT",
  });

export const experienceYears = positiveNumber.default(0);

/* -----------------------------------------------------
   4) BRANCH & ATTENDANCE
----------------------------------------------------- */

export const branches = Joi.array().items(objectId).unique().messages({
  "array.base": "Branches must be an array of branch IDs",
});

export const primaryBranch = objectId.allow(null).messages({
  "any.only": "Invalid primary branch ID",
});

export const attendance = Joi.array().items(objectId).unique().messages({
  "array.base": "Attendance must be an array of attendance IDs",
});

export const leaveRef = Joi.array().items(objectId).unique().messages({
  "array.base": "Leave references must be an array of leave IDs",
});

export const availableToday = booleanField.default(true);

export const joiningDate = dateField.required().messages({
  "any.required": "Joining date is required",
});

export const exitDate = dateField.allow(null);

export const status = Joi.string()
  .valid("ACTIVE", "ON_LEAVE", "RESIGNED", "TERMINATED")
  .default("ACTIVE")
  .messages({
    "any.only": "Status must be ACTIVE, ON_LEAVE, RESIGNED, or TERMINATED",
  });

/* -----------------------------------------------------
   5) PAYROLL DETAILS
----------------------------------------------------- */

export const salaryType = Joi.string()
  .valid("MONTHLY", "HOURLY", "PER_CLASS")
  .default("MONTHLY")
  .messages({
    "any.only": "Salary type must be MONTHLY, HOURLY, or PER_CLASS",
  });

export const salaryAmount = positiveNumber.default(0);
export const hourlyRate = positiveNumber.default(0);

export const receivedPayrolls = Joi.array().items(objectId).unique().messages({
  "array.base": "Received payrolls must be an array of IDs",
});

/* -----------------------------------------------------
   6) BANK DETAILS
----------------------------------------------------- */

export const bankDetails = Joi.object({
  accountHolderName: Joi.string().trim().max(100).allow(""),
  accountNumber: Joi.string().trim().max(30).allow(""),
  bankName: Joi.string().trim().max(100).allow(""),
  // Indian IFSC Validation
  ifscCode: Joi.string().trim().pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/).allow("").messages({
    "string.pattern.base": "IFSC code must be a valid Indian IFSC code",
  }),
  branchName: Joi.string().trim().max(100).allow(""),
}).messages({
  "object.base": "Bank details must be an object",
});

/* -----------------------------------------------------
   7) DOCUMENTS
----------------------------------------------------- */

export const documents = Joi.object({
  idProof: Joi.string().uri().allow(""),
  addressProof: Joi.string().uri().allow(""),
  resume: Joi.string().uri().allow(""),
  offerLetter: Joi.string().uri().allow(""),
  joiningLetter: Joi.string().uri().allow(""),
  relievingLetter: Joi.string().uri().allow(""),
  certificates: Joi.array().items(Joi.string().uri()).default([]),
}).messages({
  "object.base": "Documents must be an object containing URLs",
});

export const documentsUploaded = booleanField.default(false);

/* -----------------------------------------------------
   8) META & AUDIT
----------------------------------------------------- */

export const isVerified = booleanField.default(false);

export const remarks = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Remarks cannot exceed 500 characters",
});

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);