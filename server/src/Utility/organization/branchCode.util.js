// utils/organization/branchCode.util.js

export const generateBranchCode = (orgCode = "ORG-0001", lastBranch = "BR-0000") => {
  const prefix = "BR-";

  const lastNumber = parseInt(lastBranch.split("-")[1]); // 0000 → 0
  const newNumber = (lastNumber + 1).toString().padStart(4, "0");

  return `${prefix}${newNumber}`;
};
