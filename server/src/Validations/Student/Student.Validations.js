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

/* -----------------------------------------------------
   2) LINKED USER
----------------------------------------------------- */

export const userId = objectId.required().messages({
  "any.required": "User ID is required for student profile",
});

/* -----------------------------------------------------
   3) BASIC PERSONAL DETAILS
----------------------------------------------------- */

export const fatherName = Joi.string().trim().min(2).max(100).messages({
  "string.base": "Father name must be a string",
  "string.min": "Father name must be at least 2 characters long",
  "string.max": "Father name must not exceed 100 characters",
});

export const motherName = Joi.string().trim().min(2).max(100).messages({
  "string.base": "Mother name must be a string",
  "string.min": "Mother name must be at least 2 characters long",
  "string.max": "Mother name must not exceed 100 characters",
});

export const bloodGroup = Joi.string()
  .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
  .messages({
    "any.only": "Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-",
  });

export const gender = Joi.string()
  .valid("Male", "Female", "Other")
  .messages({
    "any.only": "Gender must be Male, Female, or Other",
  });

export const dob = dateField.messages({
  "date.base": "Date of birth must be a valid date",
});

export const address = Joi.string().trim().max(500).allow("").messages({
  "string.base": "Address must be a string",
  "string.max": "Address must not exceed 500 characters",
});

export const profileImage = Joi.string().uri().allow("").messages({
  "string.uri": "Profile image must be a valid URL",
});

/* -----------------------------------------------------
   4) CONTACT DETAILS
----------------------------------------------------- */

// Individual Field Validations
export const mobileNumber = Joi.string().pattern(/^[0-9]{10,15}$/).messages({
    "string.pattern.base": "Phone number must contain 10–15 digits",
});

export const email = Joi.string().email().allow("").messages({
  "string.email": "Email must be a valid email address",
});

// Nested Contact Object Validation
export const contact = Joi.object({
  whatsapp: mobileNumber.optional(),
  parentMobile: mobileNumber.optional(),
  alternateMobile: mobileNumber.allow("").optional(),
  email: email.optional(),
}).messages({
  "object.base": "Contact must be an object containing contact details",
});

/* -----------------------------------------------------
   5) ORGANIZATION / ACADEMIC MAPPING
----------------------------------------------------- */

export const branch = objectId.messages({
  "any.only": "Invalid branch reference",
});

export const batch = objectId.allow(null).messages({
  "any.only": "Invalid batch reference",
});

export const academicProfile = objectId.allow(null).messages({
  "any.only": "Invalid academic profile reference",
});

export const assignedTeacher = Joi.array().items(objectId).unique().messages({
  "array.base": "Assigned teacher must be an array of teacher IDs",
  "array.unique": "Duplicate teacher IDs are not allowed",
});

/* -----------------------------------------------------
   6) JOIN / LEAVE INFO
----------------------------------------------------- */

export const admissionNumber = Joi.string().trim().alphanum().min(1).max(50).messages({
  "string.alphanum": "Admission number must only contain letters and numbers",
  "string.base": "Admission number must be a string",
});

export const joiningDate = dateField.messages({
  "date.base": "Joining date must be a valid date",
});

export const leavingDate = dateField.allow(null).messages({
  "date.base": "Leaving date must be a valid date",
});

export const leavingReason = Joi.string().trim().max(300).allow("").messages({
  "string.max": "Leaving reason cannot exceed 300 characters",
});

/* -----------------------------------------------------
   7) REFERENCES (Arrays of IDs)
----------------------------------------------------- */

const idArray = (name) => Joi.array().items(objectId).unique().messages({
  "array.base": `${name} must be an array of ObjectIds`,
  "array.unique": `${name} cannot contain duplicate IDs`,
});

export const attendanceRef = idArray("Attendance references");
export const leaveRef = idArray("Leave references");
export const testRecords = idArray("Test records");
export const feeAccount = idArray("Fee account records");
export const onlineCourses = idArray("Online courses");

export const idCard = objectId.allow(null);

/* -----------------------------------------------------
   8) LOGIN & SECURITY
----------------------------------------------------- */

export const lastLogin = dateField;

// Schema for a single device object inside the array
const deviceSchema = Joi.object({
  deviceId: Joi.string().required(),
  ip: Joi.string().ip().allow(""),
  loggedInAt: dateField.default(Date.now),
});

export const loginDevices = Joi.array().items(deviceSchema).messages({
  "array.base": "Login devices must be an array of device objects",
});

/* -----------------------------------------------------
   9) STATUS & FLAGS
----------------------------------------------------- */

export const status = Joi.string()
  .valid("ACTIVE", "LEFT", "INACTIVE")
  .default("ACTIVE")
  .messages({
    "any.only": "Status must be ACTIVE, LEFT, or INACTIVE",
  });

export const isFeeDefaulter = booleanField;
export const isBlacklisted = booleanField;
export const isDeleted = booleanField;

/* -----------------------------------------------------
   10) AUDIT
----------------------------------------------------- */

export const deletedBy = objectId.allow(null);
export const createdBy = objectId;
export const updatedBy = objectId;