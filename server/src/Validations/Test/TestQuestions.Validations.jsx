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

/* ------------------ CORE REFERENCES ------------------ */

export const testId = objectId.messages({
  "any.only": "Invalid test reference",
});

export const createdBy = objectId.messages({
  "any.only": "Invalid createdBy reference",
});

export const updatedBy = objectId.allow(null).messages({
  "any.only": "Invalid updatedBy reference",
});

export const deletedBy = objectId.allow(null).messages({
  "any.only": "Invalid deletedBy reference",
});

/* ------------------ QUESTION CONTENT ------------------ */

export const questionText = Joi.string().trim().min(1).messages({
  "string.base": "Question text must be a string",
  "string.empty": "Question text is required",
});

export const questionImage = Joi.string().allow(null).messages({
  "string.base": "Question image must be a string",
});

export const questionType = Joi.string()
  .valid("MCQ", "TRUE_FALSE", "SUBJECTIVE", "NUMERIC")
  .messages({
    "string.base": "Question type must be a string",
    "any.only":
      "Question type must be MCQ, TRUE_FALSE, SUBJECTIVE, or NUMERIC",
  });

export const marks = positiveNumber.required().messages({
  "number.base": "Marks must be a number",
});

export const negativeMarks = positiveNumber.messages({
  "number.base": "Negative marks must be a number",
});

/* ------------------ MCQ OPTIONS ------------------ */

export const options = Joi.array()
  .items(
    Joi.object({
      optionText: Joi.string().allow("").messages({
        "string.base": "Option text must be a string",
      }),
      optionImage: Joi.string().allow("").messages({
        "string.base": "Option image must be a string",
      }),
      isCorrect: booleanField,
    })
  )
  .messages({
    "array.base": "Options must be an array",
  });

/* ------------------ ANSWERS ------------------ */

export const correctBooleanAnswer = booleanField.allow(null);

export const correctNumericAnswer = Joi.number().allow(null).messages({
  "number.base": "Numeric answer must be a number",
});

export const correctSubjectiveAnswer = Joi.string().allow("").messages({
  "string.base": "Subjective answer must be a string",
});

export const subjectiveEvaluationGuide = Joi.string().allow("").messages({
  "string.base": "Evaluation guide must be a string",
});

export const maxWordLimit = positiveNumber.allow(null).messages({
  "number.base": "Max word limit must be a number",
});

/* ------------------ META (DIFFICULTY / TAGGING) ------------------ */

export const difficulty = Joi.string()
  .valid("EASY", "MEDIUM", "HARD")
  .messages({
    "string.base": "Difficulty must be a string",
    "any.only": "Difficulty must be EASY, MEDIUM, or HARD",
  });

export const topic = Joi.string().allow("").messages({
  "string.base": "Topic must be a string",
});

export const chapter = Joi.string().allow("").messages({
  "string.base": "Chapter must be a string",
});

export const tags = Joi.array()
  .items(Joi.string())
  .messages({
    "array.base": "Tags must be an array of strings",
  });

/* ------------------ ONLINE EXAM CONTROLS ------------------ */

export const shuffleOptions = booleanField;

export const timeLimitSeconds = positiveNumber.allow(null).messages({
  "number.base": "Time limit must be a number",
});

export const mandatory = booleanField;

/* ------------------ STATUS & AUDIT ------------------ */

export const isActive = booleanField;

export const deletedAt = dateField.allow(null).messages({
  "date.base": "DeletedAt must be a valid date",
});
