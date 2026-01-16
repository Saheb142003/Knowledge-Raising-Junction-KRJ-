import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1) USER ACCOUNT LINK
    // -----------------------------------------------------
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // -----------------------------------------------------
    // 2) EMPLOYEE LINK (Payroll)
    // -----------------------------------------------------
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null, // Guest faculty = no employee profile
      index: true,
    },

    // -----------------------------------------------------
    // 3) TEACHER BASIC INFO
    // -----------------------------------------------------
    experience: { type: Number, default: 0 },
    qualification: { type: String, default: "" },

    profileImage: { type: String, default: "" },

    bio: { type: String, default: "" },         // NEW
    specialization: { type: String, default: "" }, // NEW

    // -----------------------------------------------------
    // 4) COMPLETE RELATION MAPPING
    // -----------------------------------------------------

    // Teaches these subjects
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    // Teaches in these batches
    batches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
      },
    ],

    // Routine Slots (Timetable)
    routineSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoutineSlot",
      },
    ],

    // Assignments created
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],

    // Tests created
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],

    // Students mapped
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // Lecture videos uploaded
    lectureVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LectureVideo",
      },
    ],

    // Notes created
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
      },
    ],

    // Study materials uploaded
    studyMaterials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudyMaterial",
      },
    ],

    // -----------------------------------------------------
    // 5) Teacher Ratings
    // -----------------------------------------------------
    ratings: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String, trim: true },
        date: { type: Date, default: Date.now },
      },
    ],

    averageRating: {
      type: Number,
      default: 0, // NEW auto-calc
    },

    // -----------------------------------------------------
    // 6) Attendance link (NEW)
    // -----------------------------------------------------
    attendanceRef: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],

    // -----------------------------------------------------
    // 7) Teacher Status
    // -----------------------------------------------------
    availableToday: { type: Boolean, default: true },

    isVerified: { type: Boolean, default: false },
    profileComplete: { type: Boolean, default: false },

    documentsUploaded: { type: Boolean, default: false },

    documents: {
      resume: String,
      certificates: [String],
      idProof: String,
      experienceLetters: [String],    // NEW
    },

    // -----------------------------------------------------
    // 8) Extra META
    // -----------------------------------------------------
    joiningDate: Date,  // NEW (important for payroll/HR)
    leavingDate: Date,  // NEW

    isGuestFaculty: {
      type: Boolean,
      default: false,
    },

    // -----------------------------------------------------
    // 9) AUDIT & SOFT DELETE
    // -----------------------------------------------------
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

// -----------------------------------------------------
// INDEXES FOR SUPER SPEED
// -----------------------------------------------------
teacherSchema.index({ subjects: 1 });
teacherSchema.index({ batches: 1 });
teacherSchema.index({ tests: 1 });
teacherSchema.index({ assignments: 1 });
teacherSchema.index({ availableToday: 1 });
teacherSchema.index({ isVerified: 1 });
teacherSchema.index({ specialization: 1 });

export const Teacher = mongoose.model("Teacher", teacherSchema);
