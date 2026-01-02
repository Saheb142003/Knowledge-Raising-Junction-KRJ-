import mongoose from "mongoose";

const OnlineCoursePurchaseSchema = new mongoose.Schema({
  studentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  teacher:[{
    type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
  }],
  routine:{
    type: mongoose.Schema.Types.ObjectId,
          ref: "Routine",
  },
  payment:{
    type: mongoose.Schema.Types.ObjectId,
          ref: "Payment",
  },
  courseName: String,
  price: Number,
  purchasedAt: Date,
});

export const OnlineCoursePurchase = mongoose.model(
  "OnlineCoursePurchase",
  OnlineCoursePurchaseSchema
);
