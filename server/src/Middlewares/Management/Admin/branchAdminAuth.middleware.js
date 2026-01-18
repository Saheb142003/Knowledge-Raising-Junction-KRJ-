import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";
import { Admin } from "../../Schema/Management/Admin/Admin.Schema.js";

/* =============================================================
   BRANCH ADMIN AUTH MIDDLEWARE
   - Allows Super Admin full access
   - Branch Admin → only own branches allowed
   - Requires adminAuthMiddleware to run before this
   - Checks req.user + req.query.branch / req.params.branchId / req.body.branch

   🎯 PURPOSE

✔ Sirf branch-admin ko apni branch ka data access karne de
✔ Dusri branch ka data access → ❌ Block
✔ Admin ke branches list se verify karta hai
✔ Super Admin ko full access milta hai
✔ Uses req.user → adminAuthMiddleware ke baad chalega
   ============================================================= */

export const branchAdminAuthMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || !user._id) {
      throw new ApiError(401, "Unauthorized — Login required");
    }

    // Fetch admin details
    const admin = await Admin.findById(user._id)
      .select("role branches isDeleted")
      .lean();

    if (!admin) {
      throw new ApiError(403, "Admin profile not found");
    }

    if (admin.isDeleted) {
      throw new ApiError(403, "Admin account has been disabled");
    }

    // SUPER ADMIN → Full Access
    if (admin.role === "SUPER_ADMIN") {
      return next();
    }

    // Determine which branch is being accessed
    const requestedBranch =
      req.params.branchId ||
      req.query.branchId ||
      req.query.branch ||
      req.body.branch ||
      null;

    if (!requestedBranch) {
      throw new ApiError(
        400,
        "Branch ID missing — Branch admin must specify branch"
      );
    }

    const allowedBranches = (admin.branches || []).map((id) =>
      id.toString()
    );

    // Branch Admin has access ONLY if the branch is inside his list
    if (!allowedBranches.includes(requestedBranch.toString())) {
      throw new ApiError(
        403,
        "Access Denied — You are not authorized for this branch"
      );
    }

    // If validated → allow
    next();
  } catch (err) {
    next(err);
  }
};
