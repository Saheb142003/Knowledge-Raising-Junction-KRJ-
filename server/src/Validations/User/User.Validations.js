/* ------------------ PROFILE IMAGE ------------------ */

export const profileImage = Joi.string().allow("").messages({
  "string.base": "Profile image must be a string",
});

/* ------------------ ADMIN PROFILE REFERENCE ------------------ */

export const adminProfile = objectId.allow(null).messages({
  "any.only": "Invalid admin profile reference",
});

/* ------------------ ACCOUNT STATUS ------------------ */

export const status = Joi.string()
  .valid("ACTIVE", "SUSPENDED", "BLOCKED", "DELETED")
  .messages({
    "string.base": "Status must be a string",
    "any.only": "Status must be ACTIVE, SUSPENDED, BLOCKED, or DELETED",
  });

/* ------------------ LOGIN DEVICES ------------------ */

export const loginDevices = Joi.array()
  .items(
    Joi.object({
      deviceId: Joi.string().messages({
        "string.base": "Device ID must be a string",
      }),
      ip: Joi.string().messages({
        "string.base": "IP address must be a string",
      }),
      loggedInAt: Joi.date().messages({
        "date.base": "LoggedInAt must be a valid date",
      }),
    })
  )
  .messages({
    "array.base": "Login devices must be an array",
  });

/* ------------------ ACTIVITY LOGS ------------------ */

export const activityLogs = Joi.array()
  .items(
    Joi.object({
      action: Joi.string().messages({
        "string.base": "Action must be a string",
      }),
      ip: Joi.string().messages({
        "string.base": "IP must be a string",
      }),
      device: Joi.string().messages({
        "string.base": "Device must be a string",
      }),
      timestamp: Joi.date().messages({
        "date.base": "Timestamp must be a valid date",
      }),
    })
  )
  .messages({
    "array.base": "Activity logs must be an array",
  });

/* ------------------ SOFT DELETE AUDIT ------------------ */

export const deletedBy = objectId.allow(null).messages({
  "any.only": "Invalid deletedBy user reference",
});
