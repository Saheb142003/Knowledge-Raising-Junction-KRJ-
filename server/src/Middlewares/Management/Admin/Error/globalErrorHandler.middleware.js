import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";

/* ============================================================
   GLOBAL ERROR HANDLER (CENTRALIZED)
   Handles:
   - Custom ApiError
   - Joi Validation Errors
   - Mongoose CastError
   - Mongo Duplicate Key
   - JWT Errors
   - Unexpected server errors

   ✔ Joi validation errors
✔ Mongoose CastError + Duplicate Key
✔ JWT errors
✔ Custom ApiError errors
✔ Server crash prevention
✔ Clean, uniform JSON response
✔ Logs for admin & dev
============================================================ */

export const globalErrorHandlerMiddleware = (err, req, res, next) => {

  console.error("🔥 SERVER ERROR LOG:", {
    message: err.message,
    stack: err.stack,
    status: err.statusCode || 500,
  });

  // -----------------------------
  // 1️⃣ HANDLE CUSTOM API ERROR
  // -----------------------------
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        errors: err.errors || null,
      },
    });
  }

  // -----------------------------
  // 2️⃣ JOI VALIDATION ERROR
  // -----------------------------
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        details: err.details?.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      },
    });
  }

  // -----------------------------
  // 3️⃣ MONGOOSE CAST ERROR
  // -----------------------------
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: {
        message: `Invalid ${err.path}: ${err.value}`,
      },
    });
  }

  // -----------------------------
  // 4️⃣ DUPLICATE KEY ERROR
  // -----------------------------
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: {
        message: "Duplicate record exists",
        duplicateField: err.keyValue,
      },
    });
  }

  // -----------------------------
  // 5️⃣ JSON WEB TOKEN ERROR
  // -----------------------------
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      error: {
        message: "Invalid or malformed token",
      },
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      error: {
        message: "Token expired, please login again",
      },
    });
  }

  // -----------------------------
  // 6️⃣ DEFAULT SERVER ERROR
  // -----------------------------
  return res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
      details: err.message,
    },
  });
};
