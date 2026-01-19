import { asyncHandler } from "../../../../Utility/Response/AsyncHandler.Utility.js";
import Joi from "joi";
import mongoose from "mongoose";
import { User } from "../../../../Schema/Management/User/User.Schema.js";
import { Admin } from "../../../../Schema/Management/Admin/Admin.Schema.js";
import ApiError from "../../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../../Utility/Response/SuccessResponse.Utility.js";
import { generateTokens } from "../../../../Utility/JWT/JWTTokens.Utility.js";
import { comparePassword } from "../../../../Utility/Password/Password.Utility.js";
import {
  email,
  password,
} from "../../../../Validations/User/User.Validations.js";

const adminLoginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const adminLogin = asyncHandler(async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    // 1. Validate Input
    const { error, value } = adminLoginSchema.validate(req.body, {
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
        })),
      );
    }

    const { email, password } = value;

    // 2. Check User Existence
    const user = await User.findOne({ email })
      .select("+password")
      .session(session);
    if (!user) {
      throw new ApiError(404, "Admin account not found");
    }

    // 3. Verify Password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    // 4. Verify Admin Status
    // Check if user has ADMIN role OR exists in Admin collection
    if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      throw new ApiError(403, "Access denied. Not an admin account.");
    }

    const adminProfile = await Admin.findOne({ userId: user._id }).session(
      session,
    );
    if (!adminProfile) {
      throw new ApiError(403, "Admin profile not found.");
    }

    if (!adminProfile.isActive) {
      throw new ApiError(403, "Admin account is inactive.");
    }

    // 5. Generate Tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // 6. Update Last Login
    user.lastLogin = new Date();
    await user.save({ session });

    await session.commitTransaction();

    // 7. Set Cookies
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new successResponse(res, {
          message: "Admin logged in successfully",
          data: {
            user: {
              _id: user._id,
              fullName: user.fullName,
              email: user.email,
              role: user.role,
              adminId: adminProfile._id,
              permissions: adminProfile.permissions,
            },
            accessToken,
            refreshToken,
          },
        }).data, // successResponse structure might vary, adapting to likely usage or just returning the object
      );
  } catch (error) {
    if (session) await session.abortTransaction();
    throw error;
  } finally {
    if (session) session.endSession();
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new successResponse(res, {
        message: "Admin logged out successfully",
      }).data || { message: "Admin logged out successfully" }, // Fallback if successResponse class usage differs
    );
});

export { adminLogin, adminLogout };
