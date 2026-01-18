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

// Helper for arrays of ObjectIds
const idArray = (name) => Joi.array().items(objectId).unique().messages({
  "array.base": `${name} must be an array of IDs`,
  "array.unique": `${name} cannot contain duplicate IDs`,
});

/* -----------------------------------------------------
   2) ROOM TYPE & PARTICIPANTS
----------------------------------------------------- */

export const roomType = Joi.string()
  .valid("PRIVATE", "GROUP", "BATCH_GROUP", "TEACHER_STUDENT")
  .required()
  .messages({
    "any.only": "Room type must be PRIVATE, GROUP, BATCH_GROUP, or TEACHER_STUDENT",
    "any.required": "Room type is required",
  });

export const participants = idArray("Participants").min(1).required().messages({
  "array.min": "At least one participant is required",
  "any.required": "Participants are required",
});

export const participantHash = Joi.string().trim().allow(null, "");

/* -----------------------------------------------------
   3) SPECIFIC ROOM LINKS
----------------------------------------------------- */

export const batchId = objectId.allow(null);
export const teacherId = objectId.allow(null);
export const studentId = objectId.allow(null);

/* -----------------------------------------------------
   4) GROUP INFO & ADMINS
----------------------------------------------------- */

export const name = Joi.string().trim().min(1).max(100).allow(null, "").messages({
  "string.max": "Group name cannot exceed 100 characters",
});

export const icon = Joi.string().uri().allow(null, "").messages({
  "string.uri": "Icon must be a valid URL",
});

export const description = Joi.string().trim().max(500).allow("").messages({
  "string.max": "Description cannot exceed 500 characters",
});

export const admins = idArray("Admins");

/* -----------------------------------------------------
   5) MESSAGE META
----------------------------------------------------- */

export const lastMessage = objectId.allow(null);
export const lastMessageAt = dateField.allow(null);

/* -----------------------------------------------------
   6) NOTIFICATION SETTINGS
----------------------------------------------------- */

const mutedByItem = Joi.object({
  userId: objectId.required(),
  mutedAt: dateField.default(Date.now),
});

export const mutedBy = Joi.array().items(mutedByItem).messages({
  "array.base": "MutedBy must be an array of mute records",
});

/* -----------------------------------------------------
   7) SECURITY & ACCESS CONTROL
----------------------------------------------------- */

export const isLocked = booleanField.default(false);
export const onlyAdminsCanPost = booleanField.default(false);

/* -----------------------------------------------------
   8) STATUS & AUDIT
----------------------------------------------------- */

export const isActive = booleanField.default(true);

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);