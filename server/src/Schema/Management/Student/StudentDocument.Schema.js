import mongoose from "mongoose";

const studentDocumentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    documentType: {
      type: String,
      enum: ["MARK_SHEET", "CERTIFICATE", "ID_PROOF", "OTHER"],
      default: "OTHER",
    },
    url: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or Admin
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const StudentDocument = mongoose.model(
  "StudentDocument",
  studentDocumentSchema,
);
