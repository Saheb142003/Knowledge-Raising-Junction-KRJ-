import { Student } from "../../../Schema/Management/Student/Student.Schema";

const assignTeachers = async (req, res) => {
    try {
        const { studentId, teacherIds } = req.body; // teacherIds ek array hona chahiye [id1, id2]

        // 1. Student ko dhoondo aur uske assignedTeacher array mein naye IDs push karo
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { 
                // $addToSet ka matlab hai agar teacher ID pehle se hai toh dobara add nahi hogi
                $addToSet: { assignedTeacher: { $each: teacherIds } } 
             },
            { new: true } // Taaki humein updated data wapas mile
        ).populate("assignedTeacher"); // Teacher ki details saath mein dekhne ke liye

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student nahi mila!" });
        }

        return res.status(200).json({
            success: true,
            message: "Teachers successfully assign ho gaye!",
            data: updatedStudent.assignedTeacher
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
export default assignTeachers;