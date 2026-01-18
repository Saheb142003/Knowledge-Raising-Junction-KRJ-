/* ======================================================
   notFoundMiddleware
   ------------------------------------------------------
   ▶ Any route that does not match → triggers 404
   ▶ Works with REST APIs & versioned routes
   ▶ Clean JSON response, no HTML
====================================================== */

export const notFoundMiddleware = (req, res, next) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
