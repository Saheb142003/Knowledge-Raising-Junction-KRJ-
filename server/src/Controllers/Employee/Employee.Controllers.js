import { asyncHandler } from "../../Utility/Response/AsyncHandler.Utility.js";
import Joi from 'joi';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// Validations
import { fullName, email, phone, username, password, role, createdBy } from "../../Validations/User/User.Validations.js";
import { employeeCode, designation, department, branches, employmentType, joiningDate, salaryType, salaryAmount, bankDetails, documents, experienceYears } from "../../Validations/Employee/Employee.Validations.js";
import { batches, routines } from "../../Validations/Teacher/Teacher.validations.js"; // Removed unused imports

// Models & Utils
import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";
import { User } from "../../Schema/User/User.Schema.js";
import { Employee } from "../../Schema/Employee/Employee.Schema.js";
import CounterSchema from "../../Schema/Counter/Counter.Schema.js";
import Teacher from "../../Schema/Teacher/Teacher.Schema.js";
import successResponse from "../../Utility/Response/SuccessResponse.Utility.js";

const empProfileValidationSchema = Joi.object({
    fullName: fullName.required(),
    email: email.required(),
    username: username.required(),
    password: password.required(),
    phone: phone.required(),
    role: role.required(),
    createdBy: createdBy.required(),
    designation: designation.required(),
    department: department.required(),
    branches: branches.required(),
    employmentType: employmentType.required(),
    joiningDate: joiningDate.required(),
    salaryType: salaryType.required(),
    salaryAmount: salaryAmount.required(),
    bankDetails: bankDetails.required(),
    documents: documents.required(),
    experienceYears: experienceYears.required(),
    batches: batches.required(),
    routines: routines.required()
});

const createEmployerProfile = asyncHandler(async (req, res) => {
    let session;
    try {
        // 1. Start Session
        session = await mongoose.startSession();
        session.startTransaction();

        // 2. Validate Input
        const { error, value } = empProfileValidationSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            throw new ApiError(
                400,
                "Validation failed",
                error.details.map((d) => ({
                    field: d.path.join("."),
                    message: d.message
                }))
            );
        }

        // Destructure Validated Data
        const {
            fullName, email, username, password, phone, role, createdBy,
            designation, department, branches, employmentType, joiningDate,
            salaryType, salaryAmount, bankDetails, documents, experienceYears,
            batches, routines
        } = value;

        // 3. Check for Existing User (Pass session for read consistency)
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        }).session(session);

        if (existingUser) {
            throw new ApiError(409, "User already exists");
        }

        // 4. Create User
        const SALT_ROUNDS = Number(process.env.BCRYPT_SALT) || 10;
        const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

        const newUsers = await User.create([{
            fullName,
            email,
            username,
            password: hashedPass,
            phone,
            role,
            createdBy,
        }], { session });

        const createdUser = newUsers[0]; 

        if (!createdUser) {
            throw new ApiError(500, "User Profile Creation failed");
        }

        // 5. Generate Employee Code
        const year = new Date(joiningDate).getFullYear();
        
        const counter = await CounterSchema.findOneAndUpdate(
            { key: `EMPLOYEE_${year}` },
            { $inc: { seq: 1 } },
            { new: true, upsert: true, session } 
        );

        if (!counter) throw new ApiError(500, "Failed to generate sequence");

        const generatedEmpCode = `KRJ-EMP-${year}-${String(counter.seq).padStart(3, "0")}`;

        
        const empCodeValidation = employeeCode.required().validate(generatedEmpCode);
        
        if (empCodeValidation.error) {
            throw new ApiError(400, "Generated Employee Code is invalid: " + empCodeValidation.error.message);
        }

        // 6. Create Employee
        const newEmployees = await Employee.create([{
            userId: createdUser._id,
            employeeCode: generatedEmpCode, // Use the generated code variable
            designation,
            department,
            branches,
            employmentType,
            joiningDate,
            salaryType,
            salaryAmount,
            bankDetails,
            documents,
            experienceYears,
            createdBy,
        }], { session });

        const createdEmployee = newEmployees[0];

        if (!createdEmployee) {
            throw new ApiError(500, "Employee Profile Creation failed");
        }

        // 7. Create Teacher
        const newTeachers = await Teacher.create([{
            userId: createdUser._id,
            employeeId: createdEmployee._id,
            batches,
            routines,
        }], { session });

        const createdTeacher = newTeachers[0];

        if (!createdTeacher) {
            throw new ApiError(500, "Teacher Profile Creation failed");
        }

        // 8. Commit Transaction
        await session.commitTransaction();

        return successResponse(res, {
            statusCode: 201,
            message: "Employee created successfully",
            data: {
                userId: createdUser._id,
                employeeId: createdEmployee._id,
                teacherId: createdTeacher._id,
                employeeCode: createdEmployee.employeeCode,
            },
        });

    } catch (error) {
        // Safe abort
        if (session) {
            await session.abortTransaction();
        }
        throw error;
    } finally {
        // Safe end
        if (session) {
            session.endSession();
        }
    }
});

export { createEmployerProfile };