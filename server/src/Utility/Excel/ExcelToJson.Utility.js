import xlsx from "xlsx";

export const excelToJson = (filePath) => {
  const workbook = xlsx.readFile(filePath);

  const sheetName = workbook.SheetNames[0]; // first sheet
  const sheet = workbook.Sheets[sheetName];

  const data = xlsx.utils.sheet_to_json(sheet);

  return data; // array of objects
}; 
