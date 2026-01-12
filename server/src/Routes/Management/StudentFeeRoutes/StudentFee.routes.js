import express from "express";
import {
  createFeeInvoice,
  recordFeePayment,
  getFeeInvoices,
  updateFeeInvoice,
  deleteFeeInvoice,
  getFeeSummary,
} from "../../Controllers/Management/Student/StudentFee.Controllers.js";

const router = express.Router();

router.post("/invoice", createFeeInvoice);
router.get("/invoice", getFeeInvoices);
router.put("/invoice/:invoiceId", updateFeeInvoice);
router.delete("/invoice/:invoiceId", deleteFeeInvoice);

router.post("/payment/:invoiceId", recordFeePayment);

router.get("/summary", getFeeSummary);

export default router;
