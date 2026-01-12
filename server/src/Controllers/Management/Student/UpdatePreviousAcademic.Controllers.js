import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { AcademicProfile } from "../../../Schema/Management/AcademicDetails/AcademicProfile.Schema.js";

/* ==========================================================
   VALIDATION SCHEMA
========================================================== */
const updatePreviousAcademicSchema = Joi.object({
  academicYear: Joi.string().optional(),
  classYear: Joi.string().optional(),
  board: Joi.string().length(24).optional(),
  schoolOrCollegeName: Joi.string().optional(),

  marksObtained: Joi.number().optional(),
  totalMarks: Joi.number().optional(),
  percentage: Joi.number().optional(),

  resultStatus: Joi.string()
    .valid("PASS", "FAIL", "APPEARING")
    .optional(),
});

/* ==========================================================
   UPDATE A SPECIFIC PREVIOUS ACADEMIC ENTRY
========================================================== */
const updatePreviousAcademic = asyncHandler(async (req, res) => {
  const { profileId, recordId } = req.params;

  if (!profileId || profileId.length !== 24) {
    throw new ApiError(400, "Invalid academic profile ID");
  }

  if (!recordId || recordId.length !== 24) {
    throw new ApiError(400, "Invalid previous academic record ID");
  }

  // 1️⃣ Validate body
  const { error, value } = updatePreviousAcademicSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      }))
    );
  }

  // 2️⃣ Find Profile & Update Specific Entry
  const updatedProfile = await AcademicProfile.findOneAndUpdate(
    {
      _id: profileId,
      "previousAcademics._id": recordId,
    },
    {
      $set: Object.entries(value).reduce(
        (acc, [key, val]) => ({
          ...acc,
          [`previousAcademics.$.${key}`]: val,
        }),
        {}
      ),
    },
    { new: true }
  )
    .populate("board", "name code")
    .populate("course", "name code")
    .lean();

  if (!updatedProfile) {
    throw new ApiError(404, "Previous academic record not found");
  }

  return successResponse(res, {
    message: "Previous academic record updated successfully",
    data: updatedProfile,
  });
});

export default updatePreviousAcademic;
