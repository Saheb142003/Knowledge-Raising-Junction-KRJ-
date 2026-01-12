import express from "express";

import { applyForLeave } from "../../../Controllers/Management/Leave/LeavePostMethods.Controllers.js";
import { approveLeave } from "../../../Controllers/Management/Leave/LeaveApproveMethods.Controllers.js";
import { rejectLeave } from "../../../Controllers/Management/Leave/LeaveRejectMethods.Controllers.js";
import { getAllLeaves } from "../../../Controllers/Management/Leave/LeaveGetAllMethods.Controllers.js";
import { getUserLeaveHistory } from "../../../Controllers/Management/Leave/LeaveGetUserHistory.Controllers.js";

import { cancelLeave } from "../../../Controllers/Management/Leave/LeaveCancelMethods.Controllers.js";
import { deleteLeave } from "../../../Controllers/Management/Leave/LeaveDeleteMethods.Controllers.js";
import { getLeaveSummary } from "../../../Controllers/Management/Leave/LeaveSummaryMethods.Controllers.js";

const router = express.Router();

router.post("/apply", applyForLeave);
router.put("/:leaveId/approve", approveLeave);
router.put("/:leaveId/reject", rejectLeave);

router.put("/:leaveId/cancel", cancelLeave);
router.delete("/:leaveId", deleteLeave);

router.get("/summary", getLeaveSummary);

router.get("/all", getAllLeaves);
router.get("/history", getUserLeaveHistory);

export default router;
