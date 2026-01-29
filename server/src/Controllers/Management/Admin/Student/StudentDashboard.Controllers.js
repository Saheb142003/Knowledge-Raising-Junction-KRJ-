import { asyncHandler } from "../../../../Utility/Response/AsyncHandler.Utility.js";
import { Student } from "../../../../Schema/Management/Student/Student.Schema.js";
import ApiError from "../../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../../Utility/Response/SuccessResponse.Utility.js";
import { checkAdminPermission } from "../Admin.Utils.js";
import { objectId } from "../../../../Validations/User/User.Validations.js";

export const getStudentDashboardAdmin = asyncHandler(async (req, res) => {
  // 1. Check Admin Permission
  const admin = await checkAdminPermission(req.user._id, "manage_students");

  const { studentId } = req.params;
  const { error } = objectId.required().validate(studentId);
  if (error) throw new ApiError(400, "Invalid Student ID");

  // 2. Fetch Student with all necessary details
  const student = await Student.findById(studentId)
    .populate({
      path: "userId",
      select: "-password -__v",
    })
    .populate("branch", "name branchCode")
    .populate("academicProfile")
    .populate("idCard")
    .populate("assignedTeacher", "userId") // Assuming Teacher -> User link
    // .populate("feeAccount") // Uncomment if you want full fee details, or aggregate below
    .lean();

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // 3. Branch Access Check
  if (admin.role !== "super_admin") {
    const isManaged = admin.managedBranches.some(
      (branch) => branch.toString() === student.branch._id.toString(),
    );
    if (!isManaged) {
      throw new ApiError(
        403,
        "Access denied. You do not manage this student's branch.",
      );
    }
  }

  // 4. Aggregate Stats (Placeholders for now, can be expanded with actual schemas)
  // Example: Calculate attendance percentage if attendanceRef exists
  const attendanceStats = {
    totalDays: student.attendanceRef?.length || 0,
    present: 0, // Need to query Attendance model to get actual status
    absent: 0,
    percentage: 0,
  };

  // Example: Calculate Fee Stats
  const feeStats = {
    totalDue: 0,
    totalPaid: 0,
    status: student.isFeeDefaulter ? "Defaulter" : "Clear",
  };

  // 5. Construct Dashboard Data
  const dashboardData = {
    profile: {
      ...student,
      // Flatten or restructure if needed
    },
    stats: {
      attendance: attendanceStats,
      fees: feeStats,
    },
    // Add more sections as needed (e.g., recent test results)
  };

  return successResponse(res, {
    message: "Student dashboard data fetched successfully",
    data: dashboardData,
  });
});
