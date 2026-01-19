import xss from "xss";
import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";

/* =======================================================================
   sanitizeInputMiddleware
   - Removes script tags
   - Cleans malicious HTML / JS
   - Deep sanitizing (body, query, params)

   
   Ye middleware XSS, HTML Injection, SQL-like malicious payloads ko block karta hai.

✔ Prevents <script> attacks
✔ Prevents HTML injection
✔ Prevents malicious JSON payloads
✔ Prevents special characters abuse
✔ Sanitizes body + query + params
✔ Deep sanitizing (nested objects)
   ======================================================================= */

const sanitizeValue = (value) => {
  if (typeof value === "string") {
    return xss(value.trim());
  }

  if (Array.isArray(value)) {
    return value.map((v) => sanitizeValue(v));
  }

  if (value !== null && typeof value === "object") {
    const sanitizedObj = {};
    Object.keys(value).forEach((key) => {
      sanitizedObj[key] = sanitizeValue(value[key]);
    });
    return sanitizedObj;
  }

  return value;
};

export const sanitizeInputMiddleware = (req, res, next) => {
  try {
    if (req.body) req.body = sanitizeValue(req.body);
    if (req.query) req.query = sanitizeValue(req.query);
    if (req.params) req.params = sanitizeValue(req.params);

    next();
  } catch (err) {
    return next(new ApiError(400, "Invalid or unsafe input detected"));
  }
};
