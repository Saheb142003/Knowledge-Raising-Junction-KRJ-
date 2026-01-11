import express from "express";

import { createAssignment } from "../../../Controllers/Management/Assignments/AssignmentsPostMethods.Controllers.js";
import { getAssignments } from "../../../Controllers/Management/Assignments/AssignmentsGetMethods.Controllers.js";
import { updateAssignment } from "../../../Controllers/Management/Assignments/AssignmentsPutMethods.Controllers.js";
import { deleteAssignment } from "../../../Controllers/Management/Assignments/AssignmentsDeleteMethods.Controllers.js";

const router = express.Router();

/* ============================
      ASSIGNMENT ROUTES
============================ */

// CREATE Assignment
router.post("/create", createAssignment);

// GET ALL Assignments (with filters)
router.get("/all", getAssignments);

// UPDATE Assignment
router.put("/:assignmentId", updateAssignment);

// DELETE Assignment
router.delete("/:assignmentId", deleteAssignment);

export default router;
