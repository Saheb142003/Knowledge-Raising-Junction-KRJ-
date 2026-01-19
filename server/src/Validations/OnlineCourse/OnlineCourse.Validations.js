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
   2) USER MAPPING
----------------------------------------------------- */

export const student = objectId.required().messages({
  "any.required": "Student ID is required",
});

export const teacher = objectId.required().messages({
  "any.required": "Teacher ID is required",
});

export const course = objectId.required().messages({
  "any.required": "Course ID is required",
});

export const payment = objectId.required().messages({
  "any.required": "Payment ID is required",
});

/* -----------------------------------------------------
   3) PURCHASE DETAILS
----------------------------------------------------- */

export const price = numberField.required();

export const purchasedAt = dateField.default(Date.now);

export const validityDays = Joi.number().integer().min(1).default(365);

export const expiryDate = dateField.allow(null);

/* -----------------------------------------------------
   4) CONTENT ACCESS & MODULES
----------------------------------------------------- */

export const contentAccess = Joi.object({
  videos: idArray("Videos").default([]),
  notes: idArray("Notes").default([]),
  materials: idArray("Materials").default([]),
  tests: idArray("Tests").default([]),
});

export const allowedModules = Joi.array()
  .items(
    Joi.string().valid("VIDEOS", "NOTES", "MATERIALS", "TESTS", "ASSIGNMENTS")
  )
  .unique()
  .messages({
    "any.only": "Invalid module type",
  });

/* -----------------------------------------------------
   5) PROGRESS TRACKING (Nested Objects)
----------------------------------------------------- */

// 5a. Overall Progress Stats
export const progress = Joi.object({
  completedVideos: numberField.default(0),
  totalVideos: numberField.default(0),
  completedNotes: numberField.default(0),
  totalNotes: numberField.default(0),
  completedTests: numberField.default(0),
  totalTests: numberField.default(0),
  percentage: Joi.number().min(0).max(100).default(0),
});

// 5b. Video Progress Schema
const videoProgressItem = Joi.object({
  videoId: objectId.required(),
  watchedDuration: numberField.default(0),
  totalDuration: numberField.default(0),
  completed: booleanField.default(false),
  lastWatchedAt: dateField,
});

export const videoProgress = Joi.array().items(videoProgressItem);

// 5c. Notes Progress Schema
const notesProgressItem = Joi.object({
  notesId: objectId.required(),
  isOpened: booleanField.default(false),
  completed: booleanField.default(false),
  openedAt: dateField,
});

export const notesProgress = Joi.array().items(notesProgressItem);

// 5d. Test Progress Schema
const testProgressItem = Joi.object({
  testId: objectId.required(),
  attempted: booleanField.default(false),
  score: numberField.default(0),
  percentage: numberField.default(0),
  attemptedAt: dateField,
});

export const testProgress = Joi.array().items(testProgressItem);

/* -----------------------------------------------------
   6) ACCESS LOGS
----------------------------------------------------- */

const deviceInfoSchema = Joi.object({
  deviceId: Joi.string().allow(""),
  os: Joi.string().allow(""),
  model: Joi.string().allow(""),
});

const accessLogItem = Joi.object({
  videoId: objectId.allow(null),
  accessedAt: dateField.default(Date.now),
  durationWatched: numberField.default(0),
  deviceInfo: deviceInfoSchema.default({}),
});

export const accessLogs = Joi.array().items(accessLogItem);

export const lastAccessedAt = dateField.allow(null);

/* -----------------------------------------------------
   7) STATUS & CERTIFICATE
----------------------------------------------------- */

export const status = Joi.string()
  .valid("ACTIVE", "EXPIRED", "BLOCKED", "REFUNDED")
  .default("ACTIVE");

export const certificateIssued = booleanField;

export const certificateUrl = Joi.string().uri().allow(null, "").messages({
  "string.uri": "Certificate URL must be a valid URI",
});

/* -----------------------------------------------------
   8) VERSION CONTROL
----------------------------------------------------- */

export const version = Joi.number().integer().min(1).default(1);

const versionHistoryItem = Joi.object({
  version: Joi.number().required(),
  updatedAt: dateField,
  changeSummary: Joi.string().allow(""),
  updatedBy: objectId,
});

export const versionHistory = Joi.array().items(versionHistoryItem);

/* -----------------------------------------------------
   9) AUDIT
----------------------------------------------------- */

export const isDeleted = booleanField;
export const deletedAt = dateField.allow(null);
export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);