import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({
  name: String,
  address: String,
});

export const Branch = mongoose.model("Branch", BranchSchema);
