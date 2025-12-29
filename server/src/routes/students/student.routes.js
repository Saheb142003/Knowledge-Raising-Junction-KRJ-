import express from "express";
import { uploadExcel } from "../Middleware/upload.middleware.js";
import { bulkStudentUpload } from "../Controllers/student.controller.js";

const router = express.Router();

router.post(
  "/bulk-upload",
  uploadExcel.single("excel"),
  bulkStudentUpload
);

export default router;
