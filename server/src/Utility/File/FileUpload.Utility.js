import { v2 as cloudinary } from "cloudinary";

export const uploadFile = async (filePath, folder = "KRJ") => {
  return cloudinary.uploader.upload(filePath, {
    folder,
  });
};

export const deleteFile = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

/// this is incomplte
