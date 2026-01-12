import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";

import { Leave } from "../../../Schema/Management/Leave/Leave.Schema.js";

export const getLeaveSummary = asyncHandler(async (req, res) => {
  const { year, month } = req.query;

  if (!year || !month) throw new ApiError(400, "Year & Month required");

  const y = Number(year);
  const m = Number(month);
  if (!Number.isInteger(y) || !Number.isInteger(m) || m < 1 || m > 12) {
    throw new ApiError(400, "Invalid year or month");
  }

  const start = new Date(y, m - 1, 1, 0, 0, 0, 0);
  const end = new Date(y, m, 0, 23, 59, 59, 999);

  // Match leaves that overlap the month range (not only those starting inside it)
  const summary = await Leave.aggregate([
    {
      $match: {
        isDeleted: false,
        startDate: { $lte: end },
        endDate: { $gte: start },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Normalize into an object with known statuses
  const result = {
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
    CANCELLED: 0,
    total: 0,
  };

  for (const r of summary) {
    const key = r._id || "UNKNOWN";
    result[key] = (result[key] || 0) + r.count;
    result.total += r.count;
  }

  return successResponse(res, {
    message: "Monthly leave summary fetched",
    data: result,
    period: { start, end },
  });
});
