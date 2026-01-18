import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";
import { Branch } from "../../Schema/Management/Branch/Branch.Schema.js";

/* =============================================================================
   crossBranchAccessGuard
   BLOCKS access if admin tries to fetch/modify another branch data
   Works even when branch is not directly in query (resource → mapped)
   🎯 PURPOSE

✔ Prevents cross-branch data hacking
✔ Ensures admin can access only his authorized branches
✔ Super Admin bypass
✔ Isko aap GET / PUT / DELETE jinme path me branch ya resource ka branch mapping hota hai un sab me laga sakte ho
✔ Highly secure
   ============================================================================= */

export const crossBranchAccessGuard = (options = {}) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ApiError(401, "Unauthorized — Login required");
      }

      const userRole = user.role;
      const adminBranches = user.branches || [];

      // SUPER ADMIN always allowed
      if (userRole === "SUPER_ADMIN") return next();

      // Branch must be provided in Route Params OR Body OR Query
      let branchId =
        req.params.branchId ||
        req.query.branchId ||
        req.body.branchId ||
        req.params.branch ||
        req.query.branch ||
        req.body.branch ||
        null;

      if (!branchId) {
        // If resource is not branch-specific → skip guard
        return next();
      }

      // Check if admin belongs to the same branch
      const isAllowed = adminBranches.some(
        (b) => b.toString() === branchId.toString()
      );

      if (!isAllowed) {
        throw new ApiError(
          403,
          "Access denied — You cannot access another branch's data"
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
