// utils/id-generator/idCard.util.js
import { getAcademicYear } from "../organization/academicYear.util.js";

export const generateIdCardNumber = (
  role = "GEN",                 // STD, TCH, EMP
  lastId = "ID-2024-GEN-0000"
) => {
  const year = getAcademicYear().split("-")[0]; // current year → 2024
  const prefix = `ID-${year}-${role}-`;

  const lastNumber = parseInt(lastId.split("-")[3]); // 0000 → 0
  const newNumber = (lastNumber + 1).toString().padStart(4, "0");

  return `${prefix}${newNumber}`;
};
