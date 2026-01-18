// utils/organization/systemSetting.util.js

export const getSystemSetting = (settings = {}, key, defaultValue = null) => {
  return settings[key] !== undefined ? settings[key] : defaultValue;
};

export const updateSystemSetting = (settings = {}, key, value) => {
  return { 
    ...settings, 
    [key]: value 
  };
};

export const applyDefaultSettings = () => {
  return {
    timezone: "Asia/Kolkata",
    dateFormat: "DD-MM-YYYY",
    currency: "INR",
    academicYear: getAcademicYear(),
    allowAutoRollNo: true,
    enableSms: false,
    enableEmail: true,
  };
};
