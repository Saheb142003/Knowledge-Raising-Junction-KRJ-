import { asyncHandler } from "../../../../Utility/Response/AsyncHandler.Utility.js";
import Teacher from "../../../../Schema/Management/Teacher/Teacher.Schema.js";
import { User } from "../../../../Schema/Management/User/User.Schema.js";
import { Employee } from "../../../../Schema/Management/Employee/Employee.Schema.js";
import ApiError from "../../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../../Utility/Response/SuccessResponse.Utility.js";
import { checkAdminPermission } from "../Admin.Utils.js";
import { objectId } from "../../../../Validations/User/User.Validations.js";
import Joi from "joi";

const getTeacherProfile = asyncHandler(async (req, res) => {
  const admin = await checkAdminPermission(req.user._id, "manage_teachers");

  const { teacherId } = req.params;
  const { error } = objectId.required().validate(teacherId);
  if (error) throw new ApiError(400, "Invalid Teacher ID");

  const teacher = await Teacher.findById(teacherId)
    .populate({
      path: "userId",
      select: "-password -__v",
    })
    .populate({
      path: "employeeId",
      populate: { path: "branches" },
    })
    .populate("subjects")
    .populate("batches")
    .lean();

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  // Branch Access Check
  if (admin.role !== "super_admin") {
    const teacherBranches = teacher.employeeId?.branches?.map((b) =>
      b._id ? b._id.toString() : b.toString(),
    );

    // Check if admin manages ANY of the teacher's branches
    const hasAccess = teacherBranches?.some((tb) =>
      admin.managedBranches.some((mb) => mb.toString() === tb),
    );

    if (!hasAccess) {
      throw new ApiError(
        403,
        "Access denied. You do not manage this teacher's branch.",
      );
    }
  }

  return successResponse(res, {
    message: "Teacher profile fetched successfully",
    data: teacher,
  });
});

const updateTeacher = asyncHandler(async (req, res) => {
  const admin = await checkAdminPermission(req.user._id, "manage_teachers");

  const { teacherId } = req.params;
  const { error: idError } = objectId.required().validate(teacherId);
  if (idError) throw new ApiError(400, "Invalid Teacher ID");

  const schema = Joi.object({
    fullName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    experience: Joi.number().optional(),
    qualification: Joi.string().optional(),
    bio: Joi.string().optional(),
    specialization: Joi.string().optional(),
  }).unknown(true);

  const { error, value } = schema.validate(req.body);
  if (error) throw new ApiError(400, "Validation failed", error.details);

  const teacher = await Teacher.findById(teacherId).populate("employeeId");
  if (!teacher) throw new ApiError(404, "Teacher not found");

  // Branch Access Check
  if (admin.role !== "super_admin") {
    const teacherBranches = teacher.employeeId?.branches?.map((b) =>
      b.toString(),
    );
    const hasAccess = teacherBranches?.some((tb) =>
      admin.managedBranches.some((mb) => mb.toString() === tb),
    );

    if (!hasAccess) {
      throw new ApiError(
        403,
        "Access denied. You do not manage this teacher's branch.",
      );
    }
  }

  // Update User
  if (value.fullName || value.email || value.phone) {
    await User.findByIdAndUpdate(teacher.userId, {
      ...(value.fullName && { fullName: value.fullName }),
      ...(value.email && { email: value.email }),
      ...(value.phone && { phone: value.phone }),
    });
  }

  // Update Teacher
  if (value.experience !== undefined) teacher.experience = value.experience;
  if (value.qualification) teacher.qualification = value.qualification;
  if (value.bio) teacher.bio = value.bio;
  if (value.specialization) teacher.specialization = value.specialization;

  await teacher.save();

  return successResponse(res, {
    message: "Teacher updated successfully",
  });
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const admin = await checkAdminPermission(req.user._id, "manage_teachers");

  const { teacherId } = req.params;
  const { error } = objectId.required().validate(teacherId);
  if (error) throw new ApiError(400, "Invalid Teacher ID");

  const teacher = await Teacher.findById(teacherId).populate("employeeId");
  if (!teacher) throw new ApiError(404, "Teacher not found");

  // Branch Access Check
  if (admin.role !== "super_admin") {
    const teacherBranches = teacher.employeeId?.branches?.map((b) =>
      b.toString(),
    );

    // STRICT CHECK: Admin must manage ALL branches the teacher is in to delete them globally
    const areAllManaged = teacherBranches?.every((tb) =>
      admin.managedBranches.some((mb) => mb.toString() === tb),
    );

    if (!areAllManaged) {
      throw new ApiError(
        403,
        "Access denied. You cannot delete a teacher who belongs to branches you do not manage. Please contact Super Admin.",
      );
    }
  }

  // Soft Delete Teacher
  teacher.isDeleted = true;
  teacher.deletedAt = new Date();
  teacher.deletedBy = admin._id;
  await teacher.save();

  // Soft Delete Employee
  if (teacher.employeeId) {
    await Employee.findByIdAndUpdate(teacher.employeeId._id, {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: admin._id,
      status: "TERMINATED",
    });
  }

  // Soft Delete User
  await User.findByIdAndUpdate(teacher.userId, {
    isActive: false,
    status: "DELETED",
  });

  return successResponse(res, {
    message: "Teacher deleted successfully (Soft Delete)",
  });
});

export { getTeacherProfile, updateTeacher, deleteTeacher };
