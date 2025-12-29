import { Branch } from "../../Models/Branch.model.js";
import { Teacher } from "../../Models/Teacher.model.js";

export const mapExcelRowToStudent = async (row, userId) => {
  const branch = await Branch.findOne({ code: row.branchCode });
  const teacher = await Teacher.findOne({ email: row.teacherEmail });

  return {
    userId,

    fatherName: row.fatherName,
    motherName: row.motherName,
    bloodGroup: row.bloodGroup,
    gender: row.gender,
    dob: new Date(row.dob),
    address: row.address,

    contact: {
      whatsapp: row.whatsapp,
      parentMobile: row.parentMobile,
    },

    branch: branch?._id || null,
    assignedTeacher: teacher ? [teacher._id] : [],
    joiningDate: new Date(row.joiningDate),
  };
};
