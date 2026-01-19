/* ------------------ CORE REFERENCES (NEW) ------------------ */

export const subjectId = objectId.messages({
  "any.only": "Invalid subject reference",
});

export const teacherId = objectId.messages({
  "any.only": "Invalid teacher reference",
});

export const batchIds = Joi.array()
  .items(objectId)
  .min(1)
  .messages({
    "array.base": "Batches must be an array",
    "array.min": "At least one batch is required",
  });

export const studentIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Students must be an array",
  });

/* ------------------ TEST TYPE & META ------------------ */

export const testType = Joi.string()
  .valid("MCQ", "SUBJECTIVE", "MIXED", "PRACTICAL")
  .messages({
    "string.base": "Test type must be a string",
    "any.only":
      "Test type must be MCQ, SUBJECTIVE, MIXED, or PRACTICAL",
  });

export const description = Joi.string().allow("").messages({
  "string.base": "Description must be a string",
});

export const durationMinutes = positiveNumber.messages({
  "number.base": "Duration must be a number",
});

/* ------------------ MARKING RULES (NEW) ------------------ */

export const passMarks = positiveNumber.messages({
  "number.base": "Pass marks must be a number",
});

export const allowNegativeMarking = Joi.boolean().messages({
  "boolean.base": "Allow negative marking must be true or false",
});

export const negativeMarksPerQuestion = positiveNumber.messages({
  "number.base": "Negative marks must be a number",
});

/* ------------------ QUESTION / RESULT LINKS ------------------ */

export const questionIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Questions must be an array",
  });

export const resultIds = Joi.array()
  .items(objectId)
  .messages({
    "array.base": "Results must be an array",
  });

/* ------------------ TEST STATUS & FLAGS ------------------ */

export const testStatus = Joi.string()
  .valid(
    "SCHEDULED",
    "ONGOING",
    "COMPLETED",
    "PUBLISHED",
    "CANCELLED"
  )
  .messages({
    "string.base": "Status must be a string",
    "any.only":
      "Status must be SCHEDULED, ONGOING, COMPLETED, PUBLISHED, or CANCELLED",
  });

export const isOnline = Joi.boolean().messages({
  "boolean.base": "IsOnline must be true or false",
});

export const allowRetest = Joi.boolean().messages({
  "boolean.base": "Allow retest must be true or false",
});

export const maxAttempts = positiveNumber.messages({
  "number.base": "Max attempts must be a number",
});

/* ------------------ ONLINE EXAM SECURITY ------------------ */

export const shuffleQuestions = Joi.boolean().messages({
  "boolean.base": "Shuffle questions must be true or false",
});

export const shuffleOptions = Joi.boolean().messages({
  "boolean.base": "Shuffle options must be true or false",
});

export const restrictTabChange = Joi.boolean().messages({
  "boolean.base": "Restrict tab change must be true or false",
});

/* ------------------ AUDIT & SOFT DELETE ------------------ */

export const createdBy = objectId.messages({
  "any.only": "Invalid createdBy reference",
});

export const updatedBy = objectId.messages({
  "any.only": "Invalid updatedBy reference",
});

export const deletedBy = objectId.allow(null).messages({
  "any.only": "Invalid deletedBy reference",
});

export const deletedAt = dateField.allow(null).messages({
  "date.base": "DeletedAt must be a valid date",
});
