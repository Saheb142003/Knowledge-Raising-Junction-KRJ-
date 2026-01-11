import express from "express";
import { uploadExcel } from "../../../Middlewares/Excel/upload.middleware.js";
import { bulkStudentUpload } from "../../../Controllers/Management/Student/Student.Controllers.js";

const router = express.Router();
 
router.post(
  "/bulk-upload",
  uploadExcel.single("excel"),
  bulkStudentUpload
);

export default router;
