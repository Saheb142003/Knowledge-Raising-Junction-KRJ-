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
   2) ATTENDEE CONTEXT
----------------------------------------------------- */

export const attendeeType = Joi.string()
  .valid("STUDENT", "TEACHER", "EMPLOYEE")
  .required()
  .messages({
    "any.only": "Attendee type must be STUDENT, TEACHER, or EMPLOYEE",
    "any.required": "Attendee type is required",
  });

export const attendeeId = objectId.required().messages({
  "any.required": "Attendee ID is required",
});

/* -----------------------------------------------------
   3) ACADEMIC CONTEXT
----------------------------------------------------- */

export const branch = objectId.required().messages({
  "any.required": "Branch reference is required",
});

export const batch = objectId.allow(null);
export const subject = objectId.allow(null);
export const routineSlot = objectId.allow(null);

/* -----------------------------------------------------
   4) ATTENDANCE STATUS & TIME
----------------------------------------------------- */

export const date = dateField.required().messages({
  "any.required": "Attendance date is required",
});

export const status = Joi.string()
  .valid("PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE")
  .required()
  .messages({
    "any.only": "Status must be PRESENT, ABSENT, LATE, HALF_DAY, or ON_LEAVE",
    "any.required": "Attendance status is required",
  });

export const checkInTime = dateField.allow(null);
export const checkOutTime = dateField.allow(null);

export const lateByMinutes = numberField.default(0);

/* -----------------------------------------------------
   5) MARKING INFO & METHOD
----------------------------------------------------- */

export const markedBy = objectId.required().messages({
  "any.required": "MarkedBy user reference is required",
});

export const markedByType = Joi.string()
  .valid("TEACHER", "ADMIN", "SYSTEM")
  .default("TEACHER");

export const method = Joi.string()
  .valid("MANUAL", "QR", "FACE", "RFID", "AUTO")
  .default("MANUAL");

const deviceInfoSchema = Joi.object({
  ip: Joi.string().ip().allow(""),
  userAgent: Joi.string().allow(""),
  location: Joi.string().allow(""),
});

export const deviceInfo = deviceInfoSchema.default({});

/* -----------------------------------------------------
   6) CORRECTION LOGS
----------------------------------------------------- */

const correctionLogItem = Joi.object({
  previousStatus: Joi.string().valid("PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE"),
  newStatus: Joi.string().valid("PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE"),
  changedBy: objectId,
  changedAt: dateField.default(Date.now),
  remark: Joi.string().allow(""),
});

export const correctionLogs = Joi.array().items(correctionLogItem).messages({
  "array.base": "Correction logs must be an array of log objects",
});

/* -----------------------------------------------------
   7) META & AUDIT
----------------------------------------------------- */

export const remarks = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Remarks must not exceed 500 characters",
});

export const isDeleted = booleanField.default(false);
export const deletedAt = dateField.allow(null);
export const deletedBy = objectId.allow(null);