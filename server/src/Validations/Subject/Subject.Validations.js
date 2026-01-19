import Joi from "joi";

/* -----------------------------------------------------
   1) COMMON HELPERS
----------------------------------------------------- */

export const objectId = Joi.string().hex().length(24).messages({
  "string.base": "ID must be a string",
  "string.hex": "ID must be a valid hexadecimal value",
  "string.length": "ID must be a valid 24-character ObjectId",
});

export const dateField = Joi.date().iso().allow(null).messages({
  "date.base": "Date must be a valid date",
  "date.format": "Date must be in ISO format",
});

export const booleanField = Joi.boolean().messages({
  "boolean.base": "Value must be true or false",
});

export const deleteReasonSchema = Joi.string()
  .trim()
  .min(10)
  .max(300)
  .required()
  .messages({
    "any.required": "Delete reason is required",
    "string.base": "Delete reason must be a string",
    "string.empty": "Delete reason cannot be empty",
    "string.min": "Delete reason must be at least 10 characters",
    "string.max": "Delete reason must be at most 300 characters",
  });

/* -----------------------------------------------------
   2) CORE SUBJECT FIELDS
----------------------------------------------------- */

export const name = Joi.string().trim().min(2).max(100).messages({
  "string.base": "Subject name must be a string",
  "string.empty": "Subject name is required",
  "string.min": "Subject name must be at least 2 characters long",
  "string.max": "Subject name must not exceed 100 characters",
});

// Matches schema 'code'
export const subjectCode = Joi.string()
  .trim()
  // Pattern based on your example: KRJ-2025-PHY-001
  .pattern(/^KRJ-(20\d{2})-[A-Z]{2,5}-\d{3}$/)
  .messages({
    "string.base": "Subject code must be a string",
    "string.empty": "Subject code is required",
    "string.pattern.base":
      "Subject code must be in format KRJ-YYYY-INITIALS-XXX (e.g. KRJ-2025-PHY-001)",
  });

export const description = Joi.string().max(1000).allow("").messages({
  "string.base": "Description must be a string",
  "string.max": "Description must not exceed 1000 characters",
});

export const type = Joi.string()
  .valid("THEORY", "LAB", "SEMINAR", "OPTIONAL")
  .messages({
    "string.base": "Subject type must be a string",
    "any.only": "Subject type must be THEORY, LAB, SEMINAR, or OPTIONAL",
  });

/* -----------------------------------------------------
   3) COURSE & ACADEMIC DETAILS
----------------------------------------------------- */

export const course = objectId.messages({
  "string.base": "Course ID must be a valid ObjectId",
});

export const academicYear = Joi.string()
  .trim()
  .pattern(/^\d{4}-\d{4}$/) // Validates "2024-2025" format
  .messages({
    "string.base": "Academic Year must be a string",
    "string.pattern.base": "Academic Year must be in format YYYY-YYYY",
  });

/* -----------------------------------------------------
   4) RELATIONSHIPS (Arrays of IDs)
----------------------------------------------------- */

const idArray = (fieldName) =>
  Joi.array().items(objectId).unique().messages({
    "array.base": `${fieldName} must be an array of IDs`,
    "array.unique": `${fieldName} must not contain duplicate IDs`,
  });

export const batches = idArray("Batches");
export const teachers = idArray("Teachers");
export const students = idArray("Students");
export const routines = idArray("Routines");
export const tests = idArray("Tests");
export const assignments = idArray("Assignments");

// New Content Fields
export const lectureVideos = idArray("Lecture Videos");
export const notes = idArray("Notes");
export const studyMaterials = idArray("Study Materials");

/* -----------------------------------------------------
   5) SYLLABUS & CHAPTERS
----------------------------------------------------- */

export const syllabusCompletion = Joi.number().min(0).max(100).messages({
  "number.base": "Syllabus completion must be a number",
  "number.min": "Syllabus completion cannot be less than 0%",
  "number.max": "Syllabus completion cannot exceed 100%",
});

// Complex Object for Chapters
export const chapterItem = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Chapter title is required",
  }),
  description: Joi.string().allow(""),
  completed: booleanField.default(false),
  progress: Joi.number().min(0).max(100).default(0),
  updatedAt: dateField,
});

export const chapters = Joi.array().items(chapterItem).messages({
  "array.base": "Chapters must be an array of chapter objects",
});

/* -----------------------------------------------------
   6) AUDIT & ADMIN
----------------------------------------------------- */

export const isActive = booleanField;

export const createdBy = objectId.messages({
  "any.required": "Created By (Admin ID) is required",
});

export const updatedBy = objectId;

/* -----------------------------------------------------
   ⭐ EXPORTED SCHEMAS (For Controllers)
----------------------------------------------------- */

// 1. CREATE Subject Schema
export const createSubjectSchema = Joi.object({
  name: name.required(),
  code: subjectCode.required(),
  description: description.optional(),
  type: type.default("THEORY"),
  
  course: course.required(), // Usually required on creation
  academicYear: academicYear.optional(),
  
  // Relations are usually empty on creation, but allowed
  batches: batches.default([]),
  teachers: teachers.default([]),
  students: students.default([]),
  
  createdBy: createdBy.required(),
});

// 2. UPDATE Subject Schema
export const updateSubjectSchema = Joi.object({
  name: name.optional(),
  code: subjectCode.optional(),
  description: description.optional(),
  type: type.optional(),
  
  course: course.optional(),
  academicYear: academicYear.optional(),
  
  // Array updates
  batches: batches.optional(),
  teachers: teachers.optional(),
  students: students.optional(),
  routines: routines.optional(),
  tests: tests.optional(),
  assignments: assignments.optional(),
  
  // Content updates
  lectureVideos: lectureVideos.optional(),
  notes: notes.optional(),
  studyMaterials: studyMaterials.optional(),
  
  // Syllabus updates
  syllabusCompletion: syllabusCompletion.optional(),
  chapters: chapters.optional(),
  
  // Status
  isActive: isActive.optional(),
  updatedBy: updatedBy.required(), // Usually needed to track who changed it
});