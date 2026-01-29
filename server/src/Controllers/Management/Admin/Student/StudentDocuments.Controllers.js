import { asyncHandler } from "../../../../Utility/Response/AsyncHandler.Utility.js";
import { StudentDocument } from "../../../../Schema/Management/Student/StudentDocument.Schema.js";
import { Student } from "../../../../Schema/Management/Student/Student.Schema.js";
import ApiError from "../../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../../Utility/Response/SuccessResponse.Utility.js";
import { checkAdminPermission } from "../Admin.Utils.js";
import { objectId } from "../../../../Validations/User/User.Validations.js";
import Joi from "joi";

// Upload a document for a student
export const uploadStudentDocument = asyncHandler(async (req, res) => {
  // 1. Check Admin Permission
  const admin = await checkAdminPermission(req.user._id, "manage_students");

  // 2. Validate Input
  const schema = Joi.object({
    studentId: objectId.required(),
    title: Joi.string().required(),
    documentType: Joi.string()
      .valid("MARK_SHEET", "CERTIFICATE", "ID_PROOF", "OTHER")
      .default("OTHER"),
    url: Joi.string().required(),
    description: Joi.string().optional().allow(""),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, "Validation failed", error.details);
  }

  const { studentId, title, documentType, url, description } = value;

  // 3. Check Student Existence and Branch Access
  const student = await Student.findById(studentId).select("branch");
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Branch Check: If not super_admin, admin must manage the student's branch
  if (admin.role !== "super_admin") {
    const isManaged = admin.managedBranches.some(
      (branch) => branch.toString() === student.branch.toString(),
    );
    if (!isManaged) {
      throw new ApiError(
        403,
        "Access denied. You do not manage this student's branch.",
      );
    }
  }

  // 4. Create Document
  const newDocument = await StudentDocument.create({
    studentId,
    title,
    documentType,
    url,
    description,
    uploadedBy: req.user._id,
  });

  return successResponse(res, {
    statusCode: 201,
    message: "Document uploaded successfully",
    data: newDocument,
  });
});

// Get all documents for a student
export const getStudentDocuments = asyncHandler(async (req, res) => {
  // 1. Check Admin Permission
  const admin = await checkAdminPermission(req.user._id, "manage_students");

  const { studentId } = req.params;
  const { error } = objectId.required().validate(studentId);
  if (error) throw new ApiError(400, "Invalid Student ID");

  // 2. Check Student Existence and Branch Access
  const student = await Student.findById(studentId).select("branch");
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  if (admin.role !== "super_admin") {
    const isManaged = admin.managedBranches.some(
      (branch) => branch.toString() === student.branch.toString(),
    );
    if (!isManaged) {
      throw new ApiError(
        403,
        "Access denied. You do not manage this student's branch.",
      );
    }
  }

  // 3. Fetch Documents
  const documents = await StudentDocument.find({ studentId }).sort({
    createdAt: -1,
  });

  return successResponse(res, {
    message: "Student documents fetched successfully",
    data: documents,
  });
});
