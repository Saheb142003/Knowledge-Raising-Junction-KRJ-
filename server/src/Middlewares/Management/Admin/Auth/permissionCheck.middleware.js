import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";

/* ============================================================
   PERMISSION CHECK MIDDLEWARE
   Usage:
     permissionCheckMiddleware("manage_students")
     permissionCheckMiddleware("manage_students", "manage_batches")
   ============================================================ */

export const permissionCheckMiddleware = (...requiredPermissions) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user || !user.role) {
        throw new ApiError(401, "Unauthorized — Login required");
      }

      const userRole = user.role;
      const userPermissions = user.permissions || [];

      // SUPER ADMIN override
      if (userRole === "SUPER_ADMIN") {
        return next();
      }

      // If admin has at least one required permission
      const hasPermission = requiredPermissions.some((perm) =>
        userPermissions.includes(perm)
      );

      if (!hasPermission) {
        throw new ApiError(
          403,
          `Access denied — Missing permission: ${requiredPermissions.join(", ")}`
        );
      }

      return next();

    } catch (err) {
      next(err);
    }
  };
};
