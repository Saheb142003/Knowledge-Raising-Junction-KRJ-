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

export const testId = objectId.messages({
  "any.only": "Invalid test reference",
});

export const studentId = objectId.messages({
  "any.only": "Invalid student reference",
});

/* ------------------ RESULT SUMMARY ------------------ */

export const totalMarks = positiveNumber.required().messages({
  "number.base": "Total marks must be a number",
});

export const obtainedMarks = positiveNumber.messages({
  "number.base": "Obtained marks must be a number",
});

export const percentage = Joi.number().min(0).max(100).messages({
  "number.base": "Percentage must be a number",
  "number.min": "Percentage cannot be negative",
  "number.max": "Percentage cannot exceed 100",
});

export const rank = Joi.number().integer().allow(null).messages({
  "number.base": "Rank must be a number",
});

export const isPassed = booleanField.allow(null);

/* ------------------ QUESTION RESPONSES ------------------ */

export const responses = Joi.array()
  .items(
    Joi.object({
      questionId: objectId.messages({
        "any.only": "Invalid question reference",
      }),

      answer: Joi.any(),

      isCorrect: booleanField,

      marksAwarded: Joi.number().messages({
        "number.base": "Marks awarded must be a number",
      }),

      timeTakenSeconds: positiveNumber.messages({
        "number.base": "Time taken must be a number",
      }),
    })
  )
  .messages({
    "array.base": "Responses must be an array",
  });

/* ------------------ GRADING DETAILS ------------------ */

export const gradingType = Joi.string()
  .valid("AUTO", "MANUAL", "MIXED")
  .messages({
    "string.base": "Grading type must be a string",
    "any.only": "Grading type must be AUTO, MANUAL, or MIXED",
  });

export const gradedBy = objectId.allow(null).messages({
  "any.only": "Invalid grader reference",
});

export const evaluationStatus = Joi.string()
  .valid("NOT_EVALUATED", "EVALUATING", "EVALUATED")
  .messages({
    "string.base": "Evaluation status must be a string",
    "any.only":
      "Evaluation status must be NOT_EVALUATED, EVALUATING, or EVALUATED",
  });

export const answerSheetUrl = Joi.string().allow(null).messages({
  "string.base": "Answer sheet URL must be a string",
});

/* ------------------ ONLINE EXAM ANALYTICS ------------------ */

export const totalTimeTaken = positiveNumber.messages({
  "number.base": "Total time taken must be a number",
});

export const accuracyPercentage = Joi.number().min(0).max(100).messages({
  "number.base": "Accuracy percentage must be a number",
  "number.min": "Accuracy cannot be negative",
  "number.max": "Accuracy cannot exceed 100",
});

export const attemptedQuestions = positiveNumber;
export const correctCount = positiveNumber;
export const incorrectCount = positiveNumber;
export const skippedCount = positiveNumber;

/* ------------------ PUBLISH CONTROL ------------------ */

export const publishStatus = Joi.string()
  .valid("NOT_PUBLISHED", "PUBLISHED")
  .messages({
    "string.base": "Publish status must be a string",
    "any.only": "Publish status must be NOT_PUBLISHED or PUBLISHED",
  });

export const publishedAt = dateField.allow(null).messages({
  "date.base": "PublishedAt must be a valid date",
});

/* ------------------ RECHECK / REVALUATION ------------------ */

export const recheckRequested = booleanField;

export const recheckHistory = Joi.array()
  .items(
    Joi.object({
      requestedAt: dateField,
      resolvedAt: dateField.allow(null),
      previousMarks: positiveNumber,
      updatedMarks: positiveNumber,
      reviewer: objectId.messages({
        "any.only": "Invalid reviewer reference",
      }),
      remarks: Joi.string().allow("").messages({
        "string.base": "Remarks must be a string",
      }),
    })
  )
  .messages({
    "array.base": "Recheck history must be an array",
  });

/* ------------------ META INFO ------------------ */

export const remarks = Joi.string().allow("").messages({
  "string.base": "Remarks must be a string",
});

export const status = Joi.string()
  .valid("NOT_EVALUATED", "EVALUATED", "RECHECK_REQUESTED")
  .messages({
    "string.base": "Status must be a string",
    "any.only":
      "Status must be NOT_EVALUATED, EVALUATED, or RECHECK_REQUESTED",
  });

/* ------------------ AUDIT & SOFT DELETE ------------------ */

export const createdBy = objectId.allow(null).messages({
  "any.only": "Invalid createdBy reference",
});

export const updatedBy = objectId.allow(null).messages({
  "any.only": "Invalid updatedBy reference",
});

export const deletedAt = dateField.allow(null).messages({
  "date.base": "DeletedAt must be a valid date",
});

export const deletedBy = objectId.allow(null).messages({
  "any.only": "Invalid deletedBy reference",
});
