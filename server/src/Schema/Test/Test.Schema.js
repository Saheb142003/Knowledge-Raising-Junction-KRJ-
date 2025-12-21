const TestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    testName: String,
    subject: String,

    totalMarks: Number,
    obtainedMarks: Number,

    testDate: Date,
    remarks: String,
  },
  { timestamps: true }
);

export const Test = mongoose.model("Test", TestSchema);
