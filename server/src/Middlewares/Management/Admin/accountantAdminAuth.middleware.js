import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";
import { Admin } from "../../Schema/Management/Admin/Admin.Schema.js";

/* =============================================================
    ACCOUNTANT / FINANCE ADMIN ACCESS MIDDLEWARE
    - Allows SUPER_ADMIN full access
    - Allows FINANCE_ADMIN & ACCOUNTANT
    - Blocks all others
    - Use after adminAuthMiddleware

    🎯 PURPOSE (Exactly Jaisa Industry Me Hota Hai)

✔ Only these roles/modules allowed:

SUPER_ADMIN
FINANCE_ADMIN
ACCOUNTANT
✔ Prevent unauthorized access to:
Fee Management
Expense / Reimbursement
Payroll / Salary Payments
Finance Reports
✔ Uses req.user → must be used after adminAuthMiddleware
✔ Checks role + finance permissions both
   ============================================================= */

export const accountantAdminAuthMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || !user._id) {
      throw new ApiError(401, "Unauthorized — Login required");
    }

    // Fetch full admin profile
    const admin = await Admin.findById(user._id)
      .select("role permissions isDeleted")
      .lean();

    if (!admin) {
      throw new ApiError(403, "Admin profile not found");
    }

    if (admin.isDeleted) {
      throw new ApiError(403, "Admin account has been disabled");
    }

    // SUPER ADMIN → Full finance access
    if (admin.role === "SUPER_ADMIN") {
      return next();
    }

    // Allowed roles → Accountant or Finance Admin
    const allowedFinanceRoles = ["ACCOUNTANT", "FINANCE_ADMIN"];

    if (allowedFinanceRoles.includes(admin.role)) {
      return next();
    }

    // Fine-grain permission check
    const neededPermissions = [
      "manage_fees",
      "manage_salary",
      "manage_expense",
      "finance_view",
      "view_fee_reports",
    ];

    const adminPermissions = admin.permissions || [];

    const hasPermission = neededPermissions.some((perm) =>
      adminPermissions.includes(perm)
    );

    if (!hasPermission) {
      throw new ApiError(
        403,
        "Access denied — You are not authorized for finance/fees operations"
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};
