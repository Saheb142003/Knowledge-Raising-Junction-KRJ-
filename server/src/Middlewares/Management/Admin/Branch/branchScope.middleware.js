import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";

/* ============================================================
   BRANCH SCOPE MIDDLEWARE
   - Automatically injects branch filter into req.query, req.body
   - Prevents cross-branch data access
   branchScopeMiddleware ka kaam hota hai:

✔ Admin sirf apni branches ka data hi dekh sake
✔ Super Admin ko full access
✔ Query me automatic branch inject ho jaye
✔ Unauthorized branch access auto-block

🎯 PURPOSE (Super Important)
👉 Ye middleware automatically request ko secure banata hai:
User Type	Access
SUPER_ADMIN	Saare branches
BRANCH_ADMIN	Sirf apni assigned branches
ACCOUNTANT	Sirf apni branches
HR_ADMIN	Sirf apni branches
Normal Admin	Assigned branches only
   ============================================================ */

export const branchScopeMiddleware = (options = { queryKey: "branch" }) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ApiError(401, "Unauthorized — Login required");
      }

      const userRole = user.role;
      const adminBranches = user.branches || []; // Array of branch IDs

      // SUPER ADMIN → full access
      if (userRole === "SUPER_ADMIN") {
        return next();
      }

      // If admin does not belong to any branch
      if (!adminBranches.length) {
        throw new ApiError(403, "No branch assigned to this admin");
      }

      const queryBranch = req.query[options.queryKey] || req.body[options.queryKey];

      // If client sent branch manually → Validate it
      if (queryBranch) {
        const isAllowed = adminBranches.some(
          (id) => id.toString() === queryBranch.toString()
        );

        if (!isAllowed) {
          throw new ApiError(
            403,
            "Access denied — You cannot access another branch data"
          );
        }

        return next();
      }

      // If no branch provided → inject automatically
      req.query[options.queryKey] = adminBranches.length === 1 
        ? adminBranches[0]
        : { $in: adminBranches };

      return next();

    } catch (err) {
      next(err);
    }
  };
};
