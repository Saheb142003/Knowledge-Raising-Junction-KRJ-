
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";

import { User } from "../../Schema/Management/User/User.Schema.js";
import { Admin } from "../../Schema/Management/Admin/Admin.Schema.js";

// Extract bearer token from headers
const extractToken = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return null;

  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1];
};

export const adminAuthMiddleware = asyncHandler(async (req, res, next) => {
  // 1️⃣ GET TOKEN (from Cookie or Header)
  let token =
    req.cookies?.accessToken ||
    extractToken(req);

  if (!token) {
    throw new ApiError(401, "Unauthorized: Token missing");
  }

  // 2️⃣ VERIFY TOKEN
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Session expired, please login again");
    }
    throw new ApiError(401, "Invalid token");
  }

  // 3️⃣ CHECK USER EXISTS
  const user = await User.findById(decoded._id).lean();
  if (!user) throw new ApiError(404, "User not found");

  // 4️⃣ CHECK ADMIN EXISTS
  const admin = await Admin.findOne({ userId: user._id }).lean();
  if (!admin) throw new ApiError(403, "Access denied: Admin role required");

  // 5️⃣ CHECK ACCOUNT STATUS
  if (user.status === "BLOCKED") {
    throw new ApiError(403, "Your account is blocked, contact administrator");
  }

  if (user.isDeleted) {
    throw new ApiError(403, "Your account has been deleted");
  }

  // 6️⃣ ATTACH SAFE USER + ADMIN INFO TO REQ
  req.user = {
    _id: user._id,
    email: user.email,
    phone: user.phone,
    role: user.role,
    adminId: admin._id,
    branches: admin.branches || [],
    permissions: admin.permissions || [],
  };

  next();
});
