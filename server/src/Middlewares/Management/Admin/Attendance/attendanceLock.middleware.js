// ===============================
//  attendanceLockMiddleware
//  - Prevents attendance updates after cutoff time
//  - Commonly used in School/College ERP
// ===============================

import ApiError from "../Utility/Response/ErrorResponse.Utility.js";

export const attendanceLockMiddleware = (req, res, next) => {
  try {
    // Admin-configurable lock time
    // Example: attendance lock after 11:00 AM
    const LOCK_HOUR = Number(process.env.ATTENDANCE_LOCK_HOUR || 11);
    const LOCK_MINUTE = Number(process.env.ATTENDANCE_LOCK_MINUTE || 0);

    // Extract attendance date from request body
    const { date } = req.body;

    if (!date) {
      throw new ApiError(400, "Attendance date is required");
    }

    const attendanceDate = new Date(date);
    const today = new Date();

    // If marking for previous days → allow freely
    if (attendanceDate.toDateString() !== today.toDateString()) {
      return next();
    }

    // Set cutoff time for today
    const cutoffTime = new Date();
    cutoffTime.setHours(LOCK_HOUR);
    cutoffTime.setMinutes(LOCK_MINUTE);
    cutoffTime.setSeconds(0);

    // If current time is after cutoff → block
    if (today > cutoffTime) {
      throw new ApiError(
        403,
        `Attendance marking locked after ${LOCK_HOUR}:${LOCK_MINUTE
          .toString()
          .padStart(2, "0")} `
      );
    }

    return next();
  } catch (err) {
    next(err);
  }
};
