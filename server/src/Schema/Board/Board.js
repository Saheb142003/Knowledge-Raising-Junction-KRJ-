const BoardSchema = new mongoose.Schema({
  name: String,
});

export const Board = mongoose.model("Board", BoardSchema);
