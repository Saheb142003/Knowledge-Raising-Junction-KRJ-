import Joi from "joi";
import { createdBy, devices, email, isActive, isEmailVerified, isManagementLinked, isPhoneVerified, lockUntil, loginAttempts, managementCode, managementRef, name, password, phone, role } from "../../../Validations/EComUser/EComUser.Validations.js";


const userRegistrationValidationSchema = Joi.object({
  /* =========================
     BASIC USER INFO
  ========================== */
  name: name.required(),

  email: email.required(),

  phone,

  password: password.required(),

  /* =========================
     USER TYPE & LINKING
  ========================== */
  role, // defaults to ECOM_USER

  isManagementLinked.required(),

  /* =========================
     VERIFICATION & STATUS
  ========================== */
  isEmailVerified,
  isPhoneVerified,
  isActive,

  /* =========================
     DEVICE TRACKING
  ========================== */
  devices,

  /* =========================
     SECURITY
  ========================== */
  loginAttempts,
  lockUntil,

  /* =========================
     AUDIT
  ========================== */
  createdBy
})
.custom((value, helpers) => {
  if (value.isManagementLinked === true) {
    return helpers.error("any.custom", {
      message:
        "Management-linked users must log in using their ID card"
    });
  }
  return value;
})
.messages({
  "any.custom":
    "Management-linked users must log in using their ID card"
});




const registerUser = asyncHandler(async (req, res) => {
  /* =========================
     1. VALIDATE REQUEST BODY
  ========================== */
  const { error, value } = userRegistrationValidationSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    throw new ApiError(
      400,
      error.details.map((d) => d.message).join(", ")
    );
  }

  /* =========================
     2. EXTRACT DATA
  ========================== */
  const {
    name,
    email,
    phone,
    password,
    devices
  } = value;

  /* =========================
     3. CHECK DUPLICATES
  ========================== */
  const existingUser = await EComUser.findOne({
    $or: [
      { email },
      ...(phone ? [{ phone }] : [])
    ]
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "User with this email or phone already exists"
    );
  }

  /* =========================
     4. HASH PASSWORD
  ========================== */
  const hashedPassword = await bcrypt.hash(password, 12);

  /* =========================
     5. CREATE USER
  ========================== */
  const user = await EComUser.create({
    name,
    email,
    phone,
    password: hashedPassword,
    devices,
    role: "ECOM_USER",
    createdBy: "SELF"
  });

  /* =========================
     6. RESPONSE
  ========================== */
  return successResponse(res, {
    message: "User registered successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});


export {registerUser}