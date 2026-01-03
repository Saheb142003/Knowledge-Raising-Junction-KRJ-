import Joi from "joi";
import { asyncHandler } from "../../Utility/Response/AsyncHandler.Utility.js";
import {
  objectId,
  dateField,
  booleanField, 
  positiveNumber,
  branch,
  name,
  code,
  startDate,
  endDate,
  mentors,
  studentCapacity,
  currentStudentCount,
  teacherCapacity,
  currentTeacherCount,
  isActive,
  subjects,
  routine,
  assignments,
  batch,
  subject,
  primaryTeacher,
  syllabusCompletionPercentage,
  status,
  routineSlot,
  assignmentBatch,
}  from "../../Validations/Batch/Batch.Validations.js";




const BatchValidationSchema = Joi.object({
  branch: branch.required(),
  name: name.required(),
  code: code.required(),

  startDate: startDate.required(),
  endDate: endDate.optional(),

  mentors: mentors.optional(),

  studentCapacity: studentCapacity.optional(),
  currentStudentCount: currentStudentCount.optional(),

  teacherCapacity: teacherCapacity.optional(),
  currentTeacherCount: currentTeacherCount.optional(),

  isActive: isActive.optional(),

  subjects: subjects.optional(),
  routine: routine.optional(),
  assignments: assignments.optional(),
});

const createBatch = asyncHandler(async(req,res)=>{


})