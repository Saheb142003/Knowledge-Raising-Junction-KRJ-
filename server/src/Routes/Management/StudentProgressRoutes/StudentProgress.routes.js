import express from "express";

import {
  getTestPerformance,
  getAssignmentPerformance,
  getAttendanceSummary,
  generateReportCard,
} from "../../Controllers/Management/Student/StudentProgress.Controllers.js";

const router = express.Router();

router.get("/tests", getTestPerformance);
router.get("/assignments", getAssignmentPerformance);
router.get("/attendance-summary", getAttendanceSummary);
router.get("/report-card", generateReportCard);

export default router;
