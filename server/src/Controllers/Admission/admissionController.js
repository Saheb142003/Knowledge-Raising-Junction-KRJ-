import { Student } from "../../Schema/Student/Student.Schema";
import { IDCard } from "../../Schema/IDCard/IDCard.Schema";
import { AcademicProfile } from "../../Schema/AcademicDetails/AcademicProfile.Schema";
import { Branch } from "../../Schema/Branch/Branch.Schema";
import bcrypt from 'bcryptjs';


const addStudent=async(req,res)=>{
    try {
        const {
            // Student Basic Info
            userId, fatherName, motherName, bloodGroup, gender, dob, address, status,
            // Contact (Nested object handle karne ke liye)
            whatsapp, parentMobile, 
            // Password
            password,
            // Academic Profile Details (Form se aayenge)
            academicYear, currentClassYear, board, course, medium, previousAcademics, remarks,
            // Organization & Teachers
            branch, assignedTeacher, joiningDate, leavingDate,
            // Photo for ID Card
            photo,
            // References (Agar frontend se initial IDs aa rahi hain)
            attendanceRef, leaveRef, testRecords, feeAccount, onlineCourses
        } = req.body;

        const existingUser = await Student.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User ID already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newStudent=new Student({
            userId,
            fatherName,
            motherName,
            bloodGroup,
            gender,
            dob,
            address,
            contact:{whatsapp,parentMobile},
            password:hashpassword,
            branch,
            assignedTeacher: assignedTeacher || [],
            joiningDate:joiningDate || Date.now(),
            leavingDate,
            status:status || "ACTIVE",
            // Initially inko khali rakhte hain ya frontend se aaye IDs dalte hain
            attendanceRef: attendanceRef || [],
            leaveRef: leaveRef || [],
            testRecords: testRecords || [],
            feeAccount: feeAccount || [],
            onlineCourses: onlineCourses || []
        });
        const savedStudent = await newStudent.save();

        // --- 4. ACADEMIC PROFILE CREATE KARNA (Mapping 8+ Fields) ---
        const newProfile = new AcademicProfile({
            studentId:savedStudent._id,
            academicYear,
            currentClassYear,
            board,
            course,
            medium,
            previousAcademics: previousAcademics || [],
            isActive: true,
            remarks: remarks || ""
        });
        const savedProfile = await newProfile.save();

        // --- 5. ID CARD CREATE KARNA ---


        // CUSTOM UNIQUE ID GENERATION (KRJ/2026/0001) ---
        const currentYear = new Date().getFullYear(); // 2026
        
        // Count students registered in the current year
        const count = await Student.countDocuments({
            createdAt: {
                $gte: new Date(`${currentYear}-01-01`),
                $lte: new Date(`${currentYear}-12-31`)
            }
        });

        // Format: KRJ/2026/ + (count + 1 padded to 4 digits)
        const nextSequence = (count + 1).toString().padStart(4, '0');
        const customAdmissionId = `KRJ/${currentYear}/${nextSequence}`;
        const newIdCard = new IDCard({
            holderType: "STUDENT",
            holderId: savedStudent._id,
            idNumber: customAdmissionId, // Yahan KRJ/2026/0001 jayega
            branch,
            photo: photo || "./default-avar.jpg",
            status: "ACTIVE"
        });
        const savedIdCard = await newIdCard.save();

        // --- 7. FINAL LINKING & BRANCH UPDATE ---
        savedStudent.academicProfile = savedProfile._id;
        savedStudent.idCard = savedIdCard._id;
        await savedStudent.save();

        if (branch) {
            await Branch.findByIdAndUpdate(branch, { 
                $push: { students: savedStudent._id } 
            });
        }

        return res.status(201).json({
            success: true,
            message: "Student Admission successfully!",
            admissionNumber: customAdmissionId,
            data: savedStudent
        });

        
    } catch (error) {
        console.error("Add Student Error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

export default addStudent;








