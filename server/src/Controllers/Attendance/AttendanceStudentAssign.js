import { Attendance } from "../../Schema/Attendance/Attendance.Schema";
import { Student } from "../../Schema/Student/Student.Schema";

const markAttendance = async (req, res) => {
    try {
        const { attendeeId, branch, batch, subject, status, markedBy, remarks } = req.body;

        // 1. Aaj ki date nikalna (Time hatakar sirf Date)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 2. Check karna ki kahin aaj ki attendance pehle se toh nahi lag gayi?
        // (Aapke schema mein unique index hai: attendeeId + date)
        const existingAttendance = await Attendance.findOne({
            attendeeId,
            attendeeType: "STUDENT",
            date: today
        });

        if (existingAttendance) {
            return res.status(400).json({ 
                success: false, 
                message: "Is student ki attendance aaj pehle hi lag chuki hai!" 
            });
        }

        // 3. Naya Attendance Record banana
        const newAttendance = new Attendance({
            attendeeType: "STUDENT",
            attendeeId,
            branch,
            batch,
            subject,
            date: today,
            status, // "PRESENT", "ABSENT", "LATE", etc.
            markedBy,
            remarks,
            checkInTime: status === "PRESENT" ? new Date() : null
        });

        const savedAttendance = await newAttendance.save();

        // 4. Student Model update karna (Uski attendance history mein yeh ID add karna)
        await Student.findByIdAndUpdate(attendeeId, {
            $push: { attendanceRef: savedAttendance._id }
        });

        return res.status(201).json({
            success: true,
            message: `Attendance marked as ${status}`,
            data: savedAttendance
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
export default markAttendance;