// ====================================================================
//  FILE UPLOAD MIDDLEWARE (MULTER + CLOUDINARY)
//  - Validates file type
//  - Validates size
//  - Uploads to Cloudinary
//  - Sends file URL in req.fileUrl
// ====================================================================

import multer from "multer";
import ApiError from "../Utility/Response/ErrorResponse.Utility.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

// ==========================
// CLOUDINARY CONFIG
// ==========================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================
// ALLOWED MIME TYPES
// ==========================
const ALLOWED_TYPES = {
  image: ["image/jpeg", "image/png", "image/webp"],
  document: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  video: ["video/mp4", "video/mpeg"],
};

// ==========================
// MULTER TEMP STORAGE
// ==========================
const storage = multer.memoryStorage();

// ==========================
// FILE LIMIT (MB)
// ==========================
const MAX_SIZE_MB = 10;

// ==========================
// FILE FILTER
// ==========================
const fileFilter = (allowedCategory) => {
  return (req, file, cb) => {
    const allowedMime = ALLOWED_TYPES[allowedCategory];

    if (!allowedMime.includes(file.mimetype)) {
      return cb(
        new ApiError(
          400,
          `Invalid file type. Allowed: ${allowedMime.join(", ")}`
        ),
        false
      );
    }

    cb(null, true);
  };
};

// ==========================
// MULTER UPLOADER
// ==========================
export const uploadFileMiddleware = (category = "image") => {
  return (req, res, next) => {
    const multerUpload = multer({
      storage,
      fileFilter: fileFilter(category),
      limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
    }).single("file");

    multerUpload(req, res, async (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          return next(new ApiError(400, err.message));
        }
        return next(err);
      }

      if (!req.file) {
        return next(new ApiError(400, "No file uploaded"));
      }

      try {
        const fileExt = path.extname(req.file.originalname);
        const fileName = `ERP-${Date.now()}${fileExt}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
          {
            resource_type: category === "video" ? "video" : "auto",
            folder: "erp_uploads",
            public_id: fileName,
          },
          (error, data) => {
            if (error) {
              return next(new ApiError(500, "Cloud upload failed"));
            }
            req.fileUrl = data.secure_url;
            return next();
          }
        );

        result.end(req.file.buffer);
      } catch (uploadErr) {
        return next(new ApiError(500, "File processing failed"));
      }
    });
  };
};
