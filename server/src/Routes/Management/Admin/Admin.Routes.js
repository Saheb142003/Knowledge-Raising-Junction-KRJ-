import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  seedSuperAdmin,
  createAdmin,
  getAllAdmins,
  getAdminProfile,
  updateAdmin,
  deleteAdmin,
  updateAdminPermissions,
} from "../../../Controllers/Management/Admin/Admin.Controllers.js";
import { adminAuthMiddleware } from "../../../Middlewares/Management/Admin/adminAuth.middleware.js";
import { superAdminOnlyMiddleware } from "../../../Middlewares/Management/Admin/superAdminOnly.middleware.js";

const router = Router();

// Public Routes
router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.post("/seed", seedSuperAdmin);

// Protected Routes (Require Login)
router.use(adminAuthMiddleware);

router.get("/", getAllAdmins);
router.get("/:adminId", getAdminProfile);

// Super Admin Only Routes
router.post("/create", superAdminOnlyMiddleware, createAdmin);
router.put("/:adminId", superAdminOnlyMiddleware, updateAdmin);
router.delete("/:adminId", superAdminOnlyMiddleware, deleteAdmin);
router.put(
  "/:adminId/permissions",
  superAdminOnlyMiddleware,
  updateAdminPermissions,
);

export default router;
