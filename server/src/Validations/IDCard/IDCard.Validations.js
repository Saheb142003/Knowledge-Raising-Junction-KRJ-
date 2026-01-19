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
   2) HOLDER CONTEXT
----------------------------------------------------- */

export const holderType = Joi.string()
  .valid("STUDENT", "EMPLOYEE", "TEACHER")
  .required()
  .messages({
    "any.only": "Holder type must be STUDENT, EMPLOYEE, or TEACHER",
    "any.required": "Holder type is required",
  });

export const holderId = objectId.required().messages({
  "any.required": "Holder ID is required",
});

export const holderTypeRef = Joi.string()
  .valid("Student", "Employee", "Teacher")
  .required()
  .messages({
    "any.only": "Holder Type Ref must be Student, Employee, or Teacher",
  });

/* -----------------------------------------------------
   3) CORE ID CARD DATA
----------------------------------------------------- */

export const idNumber = Joi.string().trim().min(3).max(50).required().messages({
  "string.base": "ID number must be a string",
  "string.empty": "ID number is required",
  "string.min": "ID number must be at least 3 characters long",
  "string.max": "ID number must not exceed 50 characters",
});

export const branch = objectId.required().messages({
  "any.required": "Branch reference is required",
});

export const batch = objectId.allow(null).messages({
  "any.only": "Invalid batch reference",
});

export const photo = Joi.string().uri().required().messages({
  "string.uri": "Photo must be a valid URL",
  "any.required": "Photo is required",
});

export const qrCode = Joi.string().allow("").messages({
  "string.base": "QR code must be a string",
});

export const barCode = Joi.string().allow("").messages({
  "string.base": "Barcode must be a string",
});

/* -----------------------------------------------------
   4) VALIDITY
----------------------------------------------------- */

export const issueDate = dateField.default(Date.now);
export const expiryDate = dateField.allow(null);
export const autoExpire = booleanField.default(true);

/* -----------------------------------------------------
   5) STATUS & META
----------------------------------------------------- */

export const status = Joi.string()
  .valid("ACTIVE", "EXPIRED", "SUSPENDED", "REISSUED")
  .default("ACTIVE")
  .messages({
    "any.only": "Status must be ACTIVE, EXPIRED, SUSPENDED, or REISSUED",
  });

export const printedCount = positiveNumber.default(0);
export const isPrimaryCard = booleanField.default(true);

/* -----------------------------------------------------
   6) REISSUE HISTORY
----------------------------------------------------- */

const reissueHistoryItem = Joi.object({
  reissuedAt: dateField.default(Date.now),
  oldIdNumber: Joi.string().allow(""),
  newIdNumber: Joi.string().allow(""),
  reason: Joi.string().allow(""),
  reissuedBy: objectId.allow(null),
});

export const reissueHistory = Joi.array().items(reissueHistoryItem).messages({
  "array.base": "Reissue history must be an array of objects",
});

/* -----------------------------------------------------
   7) ACCESS PERMISSIONS
----------------------------------------------------- */

export const accessAllowed = booleanField.default(true);

export const allowedAreas = Joi.array()
  .items(Joi.string().trim())
  .unique()
  .messages({
    "array.base": "Allowed areas must be an array of strings",
  });

/* -----------------------------------------------------
   8) QR ATTENDANCE LOGS
----------------------------------------------------- */

const scanLogItem = Joi.object({
  scannedAt: dateField.default(Date.now),
  gate: Joi.string().allow(""),
  scannedBy: objectId.allow(null),
});

export const scanLogs = Joi.array().items(scanLogItem).messages({
  "array.base": "Scan logs must be an array of objects",
});

/* -----------------------------------------------------
   9) AUDIT
----------------------------------------------------- */

export const remarks = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Remarks must not exceed 500 characters",
});

export const createdBy = objectId;
export const updatedBy = objectId;
export const deletedAt = dateField.allow(null);
export const deletedBy = objectId.allow(null);