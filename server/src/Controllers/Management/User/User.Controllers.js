import { User } from "../../../Schema/Management/User/User.Schema.js";
import { generateTokens } from "../../../Utility/JWT/JWTTokens.Utility.js";
import { comparePassword } from "../../../Utility/Password/Password.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import { email, password } from "../../../Validations/User/User.Validations.js";
import Joi from "joi";

/* ======================
   VALIDATION SCHEMA
====================== */
const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

/* ======================
   LOGIN USER
====================== */
export const loginUser = asyncHandler(async (req, res) => {

  // 1️⃣ Validate Input
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ApiError(
      400,
      "Invalid input",
      error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      }))
    );
  }

  const { email, password } = value;

  // 2️⃣ Find user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new ApiError(404, "User does not exist");

  // Optional: Check if user is soft-deleted
  // if (user.isDeleted) throw new ApiError(403, "Account disabled");

  // Optional: Check if user is blocked
  if (user.status === "BLOCKED") {
    throw new ApiError(403, "Your account is blocked. Contact admin.");
  }

  // Optional: Email verification check
  // if (!user.isEmailVerified) {
  //   throw new ApiError(403, "Please verify your email first");
  // }

  // 3️⃣ Check Password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 4️⃣ Generate Tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // 5️⃣ Update last login (no session needed)
  user.lastLogin = new Date();
  await user.save();

  // 6️⃣ Set Secure Cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  // 7️⃣ Clean user details
  const loggedInUser = await User.findById(user._id).select(
    "-password -twoFactorSecret -__v"
  );

  // 8️⃣ Final Response
  return successResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    data: {
      user: loggedInUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    },
  });
});

/* ======================
   LOGOUT
====================== */
export const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success: true,
      message: "User logged out successfully",
    });
});

/* ======================
   GET CURRENT USER
====================== */
export const getCurrentUser = asyncHandler(async (req, res) => {
  return successResponse(res, {
    statusCode: 200,
    message: "User fetched successfully",
    data: { user: req.user },
  });
});
