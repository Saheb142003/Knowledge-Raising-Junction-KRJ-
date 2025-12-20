const ShiftSchema = new mongoose.Schema({
  name: String, // Morning / Evening
  startTime: String,
  endTime: String,
  breakDuration: String,
});

export const Shift = mongoose.model("Shift", ShiftSchema);
