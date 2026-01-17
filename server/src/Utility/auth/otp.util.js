// utils/auth/otp.util.js

export const generateOTP = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

export const verifyOTP = (enteredOtp, originalOtp) => {
  return enteredOtp === originalOtp;
};
