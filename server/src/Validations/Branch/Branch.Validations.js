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
   2) BASIC INFO
----------------------------------------------------- */

export const name = Joi.string().trim().min(2).max(100).required().messages({
  "string.empty": "Branch name is required",
  "string.min": "Branch name must be at least 2 characters",
  "string.max": "Branch name must not exceed 100 characters",
});

export const address = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Address must not exceed 500 characters",
});

export const branchCode = Joi.string()
  .trim()
  .pattern(/^KRJ-\d{4}-[A-Z]{2,5}-\d{2}$/)
  .required()
  .messages({
    "string.empty": "Branch code is required",
    "string.pattern.base": "Branch code must follow format KRJ-YYYY-CODE-NUM (e.g. KRJ-2025-KOL-01)",
  });

/* -----------------------------------------------------
   3) CONTACT & LOCATION
----------------------------------------------------- */

export const phone = Joi.string().trim().pattern(/^[0-9]{10,15}$/).allow(null, "").messages({
  "string.pattern.base": "Phone number must contain 10-15 digits",
});

export const email = Joi.string().email().trim().lowercase().allow(null, "").messages({
  "string.email": "Email must be a valid email address",
});

const geoLocationSchema = Joi.object({
  lat: Joi.number().min(-90).max(90).allow(null),
  lng: Joi.number().min(-180).max(180).allow(null),
});

export const geoLocation = geoLocationSchema.default({});

/* -----------------------------------------------------
   4) RELATIONSHIPS
----------------------------------------------------- */

export const batches = idArray("Batches");
export const students = idArray("Students");
export const employees = idArray("Employees");
export const managedBy = idArray("Managers");

/* -----------------------------------------------------
   5) FINANCIAL MAPPING
----------------------------------------------------- */

export const feeReceiptCounter = objectId.allow(null);

const bankDetailsSchema = Joi.object({
  accountName: Joi.string().trim().allow(""),
  accountNumber: Joi.string().trim().allow(""),
  bankName: Joi.string().trim().allow(""),
  ifscCode: Joi.string().trim().pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/).allow("").messages({
    "string.pattern.base": "Invalid IFSC Code format",
  }),
});

export const bankDetails = bankDetailsSchema.default({});

/* -----------------------------------------------------
   6) CAPACITY & OPERATIONS
----------------------------------------------------- */

export const studentCapacity = numberField.default(1000);
export const currentStudentCount = numberField.default(0);

export const employeeCapacity = numberField.default(50);
export const currentEmployeeCount = numberField.default(0);

/* -----------------------------------------------------
   7) STATUS & AUDIT
----------------------------------------------------- */

export const isActive = booleanField.default(true);
export const isDeleted = booleanField.default(false);

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);