import Joi from "joi";

/* ------------------ COMMON HELPERS ------------------ */

export const objectId = Joi.string().hex().length(24).messages({
  "string.base": "ID must be a string",
  "string.hex": "ID must be a valid hexadecimal value",
  "string.length": "ID must be a valid 24-character ObjectId",
});

export const positiveNumber = Joi.number().min(0).messages({
  "number.base": "Value must be a number",
  "number.min": "Value cannot be negative",
});

export const booleanField = Joi.boolean().messages({
  "boolean.base": "Value must be true or false",
});

export const dateField = Joi.date().messages({
  "date.base": "Value must be a valid date",
});

/* ------------------ CORE LINKS ------------------ */

export const userId = objectId.messages({
  "any.only": "Invalid user reference",
});

export const employeeId = objectId.allow(null).messages({
  "any.only": "Invalid employee reference",
});

/* ------------------ BASIC INFO ------------------ */

export const experience = positiveNumber.messages({
  "number.base": "Experience must be a number",
});

export const qualification = Joi.string().allow("").messages({
  "string.base": "Qualification must be a string",
});

export const profileImage = Joi.string().allow("").messages({
  "string.base": "Profile image must be a string",
});

export const bio = Joi.string().allow("").messages({
  "string.base": "Bio must be a string",
});

export const specialization = Joi.string().allow("").messages({
  "string.base": "Specialization must be a string",
});

/* ------------------ RELATION MAPPINGS ------------------ */

export const subjectIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Subjects must be an array",
  });

export const batchIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Batches must be an array",
  });

export const routineSlotIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Routine slots must be an array",
  });

export const assignmentIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Assignments must be an array",
  });

export const testIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Tests must be an array",
  });

export const studentIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Students must be an array",
  });

export const lectureVideoIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Lecture videos must be an array",
  });

export const noteIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Notes must be an array",
  });

export const studyMaterialIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Study materials must be an array",
  });

/* ------------------ RATINGS ------------------ */

export const ratings = Joi.array()
  .items(
    Joi.object({
      studentId: objectId.messages({
        "any.only": "Invalid student reference",
      }),
      rating: Joi.number().min(1).max(5).messages({
        "number.base": "Rating must be a number",
        "number.min": "Rating must be at least 1",
        "number.max": "Rating cannot exceed 5",
      }),
      review: Joi.string().allow("").messages({
        "string.base": "Review must be a string",
      }),
      date: dateField,
    })
  )
  .messages({
    "array.base": "Ratings must be an array",
  });

export const averageRating = positiveNumber.messages({
  "number.base": "Average rating must be a number",
});

/* ------------------ ATTENDANCE ------------------ */

export const attendanceRef = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Attendance reference must be an array",
  });

/* ------------------ STATUS FLAGS ------------------ */

export const availableToday = booleanField;
export const isVerified = booleanField;
export const profileComplete = booleanField;
export const documentsUploaded = booleanField;

/* ------------------ DOCUMENTS ------------------ */

export const documents = Joi.object({
  resume: Joi.string().allow("").messages({
    "string.base": "Resume must be a string",
  }),
  certificates: Joi.array()
    .items(Joi.string())
    .messages({
      "array.base": "Certificates must be an array of strings",
    }),
  idProof: Joi.string().allow("").messages({
    "string.base": "ID proof must be a string",
  }),
  experienceLetters: Joi.array()
    .items(Joi.string())
    .messages({
      "array.base": "Experience letters must be an array of strings",
    }),
}).messages({
  "object.base": "Documents must be an object",
});

/* ------------------ HR / PAYROLL META ------------------ */

export const joiningDate = dateField;
export const leavingDate = dateField;

export const isGuestFaculty = booleanField;

/* ------------------ AUDIT & SOFT DELETE ------------------ */

export const createdBy = objectId.messages({
  "any.only": "Invalid createdBy reference",
});

export const updatedBy = objectId.messages({
  "any.only": "Invalid updatedBy reference",
});

export const deletedAt = dateField.allow(null).messages({
  "date.base": "DeletedAt must be a valid date",
});

export const deletedBy = objectId.allow(null).messages({
  "any.only": "Invalid deletedBy reference",
});
