import express from "express";
import {
  createTestRecord,
  getStudentTests,
  updateTestRecord,
  deleteTestRecord,
  getStudentTestSummary,
} from "../../Controllers/Management/Student/StudentTest.Controllers.js";

const router = express.Router();

router.post("/test", createTestRecord);
router.get("/test", getStudentTests);
router.put("/test/:testId", updateTestRecord);
router.delete("/test/:testId", deleteTestRecord);

router.get("/test-summary", getStudentTestSummary);

export default router;
