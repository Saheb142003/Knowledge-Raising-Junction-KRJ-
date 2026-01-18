// =========================================
//  academicYearGuardMiddleware
//  - Prevents modifications in CLOSED academic year
// =========================================

import ApiError from "../Utility/Response/ErrorResponse.Utility.js";
import { AcademicYear } from "../Schema/Management/AcademicYear/AcademicYear.Schema.js";

export const academicYearGuardMiddleware = async (req, res, next) => {
  try {
    const academicYearId =
      req.body.academicYear ||
      req.params.academicYearId ||
      req.query.academicYearId;

    if (!academicYearId) {
      return next(); // some routes may not require it
    }

    const academicYear = await AcademicYear.findById(academicYearId);

    if (!academicYear) {
      throw new ApiError(404, "Academic year not found");
    }

    // Check status
    if (academicYear.status === "CLOSED") {
      throw new ApiError(
        403,
        `This academic year (${academicYear.name}) is CLOSED. 
        No edits or changes are allowed.`
      );
    }

    return next();
  } catch (err) {
    next(err);
  }
};
