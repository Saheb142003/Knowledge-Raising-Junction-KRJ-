import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";

/* ============================================================
   ROLE CHECK MIDDLEWARE (Dynamic)
   Usage:
     roleCheckMiddleware("SUPER_ADMIN", "HR_ADMIN", "FINANCE_ADMIN")
     🎯 PURPOSE (Exactly Industry Standard)

✔ Kisi bhi route per allowed roles specify kar sakte ho.
✔ Agar user ka role allowed list me nahi hai → 403 Forbidden
✔ SUPER_ADMIN ko humesha full override access (industry practice).
✔ Works AFTER adminAuthMiddleware.
   ============================================================ */

export const roleCheckMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user || !user.role) {
        throw new ApiError(401, "Unauthorized — Login required");
      }

      const userRole = user.role;

      // SUPER ADMIN ALWAYS HAS FULL ACCESS
      if (userRole === "SUPER_ADMIN") {
        return next();
      }

      // If role is in allowedRoles → allow
      if (allowedRoles.includes(userRole)) {
        return next();
      }

      throw new ApiError(
        403,
        "Access denied — You do not have permission to access this resource"
      );

    } catch (err) {
      next(err);
    }
  };
};
