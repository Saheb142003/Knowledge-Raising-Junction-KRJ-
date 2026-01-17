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
   2) BASIC USER INFO
----------------------------------------------------- */

export const name = Joi.string().trim().min(2).max(100).required().messages({
  "string.empty": "Name is required",
  "string.min": "Name must be at least 2 characters",
  "string.max": "Name must not exceed 100 characters",
});

export const email = Joi.string().email().lowercase().required().messages({
  "string.email": "Please provide a valid email address",
  "any.required": "Email is required",
});

export const phone = Joi.string()
  .trim()
  .pattern(/^[0-9]{10,15}$/)
  .allow(null, "")
  .messages({
    "string.pattern.base": "Phone number must be between 10 to 15 digits",
  });

export const password = Joi.string()
  .min(8)
  .max(32)
  .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/)
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    "any.required": "Password is required",
  });

/* -----------------------------------------------------
   3) USER TYPE & LINKING
----------------------------------------------------- */

export const role = Joi.string()
  .valid("ECOM_USER")
  .default("ECOM_USER")
  .messages({
    "any.only": "Role must be ECOM_USER",
  });

export const isManagementLinked = booleanField.default(false);

const managementRefSchema = Joi.object({
  type: Joi.string().valid("STUDENT", "EMPLOYEE").required(),
  refId: objectId.required(),
});

export const managementRef = managementRefSchema.allow(null).messages({
  "object.base": "Management reference must be an object",
});

export const managementCode = Joi.string().trim().min(3).max(50).allow("").messages({
  "string.base": "Management code must be a string",
});

/* -----------------------------------------------------
   4) VERIFICATION & STATUS
----------------------------------------------------- */

export const isEmailVerified = booleanField.default(false);
export const isPhoneVerified = booleanField.default(false);
export const isActive = booleanField.default(true);
export const lastLoginAt = dateField.allow(null);

/* -----------------------------------------------------
   5) DEVICE TRACKING
----------------------------------------------------- */

const deviceSchema = Joi.object({
  deviceId: Joi.string().required(),
  deviceType: Joi.string().allow(""),
  browser: Joi.string().allow(""),
  os: Joi.string().allow(""),
  ipAddress: Joi.string().ip().allow(""),
  lastUsedAt: dateField.default(Date.now),
});

export const devices = Joi.array().items(deviceSchema).messages({
  "array.base": "Devices must be an array of device objects",
});

/* -----------------------------------------------------
   6) SECURITY
----------------------------------------------------- */

export const loginAttempts = numberField.default(0);
export const lockUntil = dateField.allow(null);

/* -----------------------------------------------------
   7) AUDIT
----------------------------------------------------- */

export const createdBy = Joi.string().default("SELF");