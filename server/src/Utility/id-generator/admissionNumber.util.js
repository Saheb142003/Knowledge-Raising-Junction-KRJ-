// utils/id-generator/admissionNumber.util.js
import { getAcademicYear } from "../organization/academicYear.util.js";

export const generateAdmissionNumber = (lastAdmission = "ADM-2024-0000") => {
  const year = getAcademicYear().split("-")[0];  // 2024
  const prefix = `ADM-${year}-`;

  const lastNumber = parseInt(lastAdmission.split("-")[2]); // 0000 → 0
  const newNumber = (lastNumber + 1).toString().padStart(4, "0");

  return `${prefix}${newNumber}`;
};
