import Joi from "joi";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { AcademicProfile } from "../../../Schema/Management/AcademicDetails/AcademicProfile.Schema.js";

/* ====================================================
   VALIDATION SCHEMA
==================================================== */
const paramValidation = Joi.object({
  profileId: Joi.string().length(24).required(),
  recordId: Joi.string().length(24).required(),
});

/* ====================================================
   DELETE PREVIOUS ACADEMIC RECORD
==================================================== */
const deletePreviousAcademic = asyncHandler(async (req, res) => {
  // 1️⃣ Validate Params
  const { error } = paramValidation.validate(req.params);

  if (error) {
    throw new ApiError(
      400,
      "Invalid parameters",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      }))
    );
  }

  const { profileId, recordId } = req.params;

  // 2️⃣ Find and Remove specific record
  const updatedProfile = await AcademicProfile.findByIdAndUpdate(
    profileId,
    {
      $pull: { previousAcademics: { _id: recordId } },
    },
    { new: true }
  )
    .populate("board", "name code")
    .populate("course", "name code")
    .lean();

  if (!updatedProfile) {
    throw new ApiError(404, "Academic profile not found");
  }

  return successResponse(res, {
    message: "Previous academic record deleted successfully",
    data: updatedProfile,
  });
});

export default deletePreviousAcademic;
