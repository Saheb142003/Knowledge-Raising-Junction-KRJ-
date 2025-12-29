import { excelToJson } from "../Utility/Excel/ExcelToJson.Utility.js";
import { mapExcelRowToStudent } from "../Utility/Excel/StudentExcelMapper.Utility.js";
import { Student } from "../Models/Student.model.js";
import { User } from "../Models/User.model.js";

export const bulkStudentUpload = async (req, res) => {
  try {
    const rows = excelToJson(req.file.path);

    const students = [];

    for (const row of rows) {
      // 1️⃣ Pehle user create (Student ka userId mandatory hai)
      const user = await User.create({
        name: row.fatherName,
        role: "STUDENT",
        email: row.email || undefined,
      });

      // 2️⃣ Excel → Student mapping
      const studentData = await mapExcelRowToStudent(row, user._id);

      students.push(studentData);
    }

    // 3️⃣ Bulk insert
    await Student.insertMany(students);

    res.status(201).json({
      success: true,
      message: "Students imported successfully",
      total: students.length,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
