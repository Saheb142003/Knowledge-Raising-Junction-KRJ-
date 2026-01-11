import express from "express";

import { getAttendance } from "../../../Controllers/Management/Attendance/AttendanceGETMethods.Controllers.js";
import { markAttendance } from "../../../Controllers/Management/Attendance/AttendancePostMethods.Controllers.js";
import { updateAttendance } from "../../../Controllers/Management/Attendance/AttendancePUTMethods.Controllers.js";

const router = express.Router();

/* ======================================================
   ATTENDANCE ROUTES
====================================================== */

// GET — all attendance filters handled in ONE route
router.get("/all", getAttendance);

// POST — mark attendance
router.post("/mark", markAttendance);

// PUT — update attendance
router.put("/:attendanceId", updateAttendance);

export default router;
