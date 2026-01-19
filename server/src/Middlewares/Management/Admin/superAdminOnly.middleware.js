import jwt from "jsonwebtoken";
import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";
import { Admin } from "../../Schema/Management/Admin/Admin.Schema.js";

/* ============================================================
   SUPER ADMIN ONLY MIDDLEWARE
   - Requires: adminAuthMiddleware → req.user already present
   - Checks: user.role === "SUPER_ADMIN"

   🎯 PURPOSE (short)

✔ Sirf SUPER_ADMIN ko access dena
✔ Agar admin → but super admin nahi → block
✔ Token se user fetch + role verify
✔ Cleaner & reusable
✔ Consistent with your existing adminAuthMiddleware
   ============================================================ */
export const superAdminOnlyMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Token must be verified BEFORE this (adminAuth)
    const user = req.user;

    if (!user || !user._id) {
      throw new ApiError(401, "Unauthorized — Login required");
    }

    // 2️⃣ Fetch admin record
    const admin = await Admin.findById(user._id).select("role isDeleted");

    if (!admin) {
      throw new ApiError(403, "Access denied — Admin account not found");
    }

    // 3️⃣ Soft deleted admin block
    if (admin.isDeleted) {
      throw new ApiError(403, "Admin account has been disabled");
    }

    // 4️⃣ Super Admin role check
    if (admin.role !== "SUPER_ADMIN") {
      throw new ApiError(
        403,
        "Access Forbidden — Only Super Admin can perform this action",
      );
    }

    // 5️⃣ Allowed
    next();
  } catch (err) {
    next(err);
  }
};
