import { Router } from "express";
import {
  addStudentsToBranch,
  addBatchesToBranch,
  addEmployeesToBranch,
} from "../../../Controllers/Management/Branch/BranchPostMethods.Controllers.js";
import {
  updateBranch,
  activateBranch,
  deactivateBranch,
} from "../../../Controllers/Management/Branch/BranchPutMethods.Controllers.js";
import {
  getBranches,
  getBranchById,
} from "../../../Controllers/Management/Branch/BranchGetMethods.Controllers.js";
import {
  createBranch,
  deleteBranch,
  assignBranchAdmin,
} from "../../../Controllers/Management/Admin/Admin.Controllers.js";
import { adminAuthMiddleware } from "../../../Middlewares/Management/Admin/adminAuth.middleware.js";
import { superAdminOnlyMiddleware } from "../../../Middlewares/Management/Admin/superAdminOnly.middleware.js";

const router = Router();

// All routes require Admin login
router.use(adminAuthMiddleware);

// Create (Super Admin Only)
router.post("/create", superAdminOnlyMiddleware, createBranch);

// Read (Filtered by Role)
router.get("/", getBranches);
router.get("/:branchId", getBranchById);

// Update
router.put("/:branchId", updateBranch); // Logic inside controller handles permissions
router.put("/:branchId/activate", activateBranch);
router.put("/:branchId/deactivate", deactivateBranch);
router.put(
  "/:branchId/assign-admin",
  superAdminOnlyMiddleware,
  assignBranchAdmin,
);

// Delete (Super Admin Only)
router.delete("/:branchId", superAdminOnlyMiddleware, deleteBranch);

// Add Entities to Branch
router.post("/:branchId/students", addStudentsToBranch);
router.post("/:branchId/batches", addBatchesToBranch);
router.post("/:branchId/employees", addEmployeesToBranch);

export default router;
