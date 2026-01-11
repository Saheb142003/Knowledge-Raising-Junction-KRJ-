import { optional, required } from "joi";

const TestSchema = new mongoose.Schema(
  {
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    }],
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    
    }, 
    teacherId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    
    },
    batches: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    
    }],

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
