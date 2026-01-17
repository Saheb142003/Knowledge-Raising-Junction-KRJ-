// utils/id-generator/teacherCode.util.js

export const generateTeacherCode = (lastCode = "TCH-0000") => {
  const prefix = "TCH-";
  const lastNumber = parseInt(lastCode.split("-")[1]); // 0000 → 0

  const newNumber = (lastNumber + 1).toString().padStart(4, "0");
  return `${prefix}${newNumber}`;
};
