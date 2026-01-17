// utils/organization/organizationCode.util.js

export const generateOrganizationCode = (lastCode = "ORG-0000") => {
  const prefix = "ORG-";
  const lastNumber = parseInt(lastCode.split("-")[1]); // 0000 → 0

  const newNumber = (lastNumber + 1).toString().padStart(4, "0");
  return `${prefix}${newNumber}`;
};
