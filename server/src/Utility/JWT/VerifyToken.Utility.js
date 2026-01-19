import jwt from "jsonwebtoken";

// Expiries
const ACCESS_EXPIRY = "15m";
const REFRESH_EXPIRY = "7d";
const TEMP_EXPIRY = "5m";

// ======================================================
// 🔥 GENERATE ACCESS + REFRESH TOKENS (ADMIN SAFE VERSION)
// ======================================================
export const generateTokens = (user) => {
  if (!user || !user._id) {
    throw new Error("Cannot generate token — invalid user object");
  }

  // ACCESS TOKEN (short life)
  const accessToken = jwt.sign(
    {
      _id: user._id,
      type: "ACCESS",
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRY }
  );

  // REFRESH TOKEN (long life)
  const refreshToken = jwt.sign(
    {
      _id: user._id,
      type: "REFRESH",
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRY }
  );

  return { accessToken, refreshToken };
};

// ======================================================
// 🔥 TEMP TOKEN (2FA, EMAIL VERIFY, PASSWORD RESET)
// ======================================================
export const generateTempToken = (userId) => {
  return jwt.sign(
    {
      _id: userId,
      type: "TEMP_2FA",
    },
    process.env.JWT_TEMP_SECRET,
    { expiresIn: TEMP_EXPIRY }
  );
};

// ======================================================
// 🔥 VERIFY TOKEN (with correct secret)
// ======================================================
export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
