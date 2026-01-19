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
   2) CORE REFERENCES
----------------------------------------------------- */

export const userId = objectId.required().messages({
  "any.required": "User ID is required for admin profile",
});

export const employeeId = objectId.allow(null);

/* -----------------------------------------------------
   3) ROLE & PERMISSIONS
----------------------------------------------------- */

export const role = Joi.string()
  .valid("super_admin", "manager", "editor", "viewer")
  .default("manager")
  .messages({
    "any.only": "Role must be super_admin, manager, editor, or viewer",
  });

export const roleUpdatedAt = dateField.allow(null);

// Updated list based on your schema
const validPermissions = [
  "manage_users",
  "manage_teachers",
  "manage_employees",
  "manage_students",
  "manage_courses",
  "manage_payments",
  "manage_branches",
  "manage_batches",
  "manage_admins",
  "manage_schedule",
  "manage_content",
  "view_reports",
  "system_settings",
];

export const permissions = Joi.array()
  .items(Joi.string().valid(...validPermissions))
  .unique()
  .messages({
    "array.base": "Permissions must be an array of valid permission strings",
    "any.only": "Invalid permission provided",
  });

/* -----------------------------------------------------
   4) BRANCH & BATCH ACCESS
----------------------------------------------------- */

export const createdBranches = idArray("Created Branches");
export const managedBranches = idArray("Managed Branches");

export const createdBatches = idArray("Created Batches");
export const managedBatches = idArray("Managed Batches");

export const managedBy = objectId.allow(null);

/* -----------------------------------------------------
   5) SETTINGS & NOTIFICATIONS
----------------------------------------------------- */

export const notifications = idArray("Notifications");

export const settings = Joi.object({
  theme: Joi.string().default("light"),
  emailNotifications: booleanField.default(true),
  dashboardLayout: Joi.object().unknown().default({}),
}).default({});

/* -----------------------------------------------------
   6) LOGGING & HISTORY
----------------------------------------------------- */

const logEntrySchema = Joi.object({
  action: Joi.string().required(),
  target: Joi.string().allow(""),
  timestamp: dateField.default(Date.now),
  details: Joi.object().unknown(),
});

export const logs = Joi.array().items(logEntrySchema);

const loginHistoryItem = Joi.object({
  ip: Joi.string().ip().allow(""),
  device: Joi.string().allow(""),
  loggedInAt: dateField.default(Date.now),
});

export const loginHistory = Joi.array().items(loginHistoryItem);

/* -----------------------------------------------------
   7) APPLICATIONS
----------------------------------------------------- */

export const jobApplications = idArray("Job Applications");
export const studentApplications = idArray("Student Applications");

/* -----------------------------------------------------
   8) STATUS & AUDIT
----------------------------------------------------- */

export const isActive = booleanField.default(true);
export const isDeleted = booleanField.default(false);
export const lastLogin = dateField.allow(null);

export const createdBy = objectId.allow(null);
export const updatedBy = objectId.allow(null);
export const deletedAt = dateField.allow(null);