ERP DATA FLOW
    USER (Root Login Account)
        → creates
            STUDENT PROFILE
            TEACHER PROFILE
            ADMIN PROFILE

    ADMIN (Controls System)
        → creates
            Branch
            Course
            FeePlan
            Subject
            Batch
            Teacher
            Employee
            Student
        → manages
            Payroll
            Fees
            Attendance
            Test System
            Assignment System
            LMS Contents
            Chat System

    BRANCH (Center Level)
        → contains
            Batches
            Students
            Teachers
            Employees
        → links to
            FeeReceiptCounter
            Admin (Managers)

    BATCH (Class Level)
        → contains
            Subjects
            Students
            Teachers (Mentors)
            RoutineSlots (Timetable)
            Assignments
            Tests
        → generates
            AttendanceSessions
            Class Notifications

    SUBJECT (Academic Unit)
        → linked with
            Batches[]
            Teachers[]
            RoutineSlots[]
        → has
            LectureVideos
            Notes
            StudyMaterials
            Assignments
            Tests

    ROUTINE SLOT (Timetable Entry)
        → for
            Batch[]
            Teacher[]
            Subject
            Day + Time
        → triggers
            AttendanceSession → Attendance[]

    ATTENDANCE
        → for attendeeType
            STUDENT
            TEACHER
            EMPLOYEE
        → belongs to
            Branch
            Batch (if student)
            Subject (if class)
        → created via
            RoutineSlot / Manual Entry

    STUDENT (Main Academic Entity)
        → belongs to
            UserAccount
            Branch
            Batch
        → has
            AcademicProfile
            AttendanceRef[]
            LeaveRef[]
            TestRecords[]
            FeeAccount[]
            IDCard
            OnlineCourses[]
        → participates in
            Assignments
            Tests
            RoutineSlots
            ChatRooms

    TEACHER (Academic Staff)
        → belongs to
            UserAccount
            EmployeeProfile (optional)
        → teaches
            Subjects[]
            Batches[]
            RoutineSlots[]
        → creates
            Assignments
            Tests
            LectureVideos
            Notes
            StudyMaterials

    EMPLOYEE (Non-Teaching/Teaching Both)
        → belongs to
            UserAccount
            IDCard
        → linked with
            Attendance[]
            Leave[]
            Payroll
            Branch[]

    ASSIGNMENT SYSTEM
        Assignment
            → createdBy Teacher
            → for Batches[]
            → linked to Subject
            → has Submissions[]
        Submission
            → by Student
            → file + marks + feedback

    TEST SYSTEM
        Test
            → for Batches[]
            → createdBy Teacher
            → has students[]
        TestQuestion
            → belongs to Test
            → MCQ / Subjective / Numeric
        TestResult
            → for Student
            → stores responses + marks

    FEES SYSTEM
        FeePlan
            → created by Admin
            → has multiple FeeStructure components
        FeeStructure
            → belongs to FeePlan
            → componentName + amount
        StudentFee
            → assigned to Student
            → contains Installments + Payments
        FeeInstallment
            → dueDate + amount
        FeePayment
            → transaction record
        FeeDue
            → dashboard realtime dues

    ID CARD SYSTEM
        IDCard
            → holderType (Student / Employee)
            → holderId
            → QRCode + Photo
            → branch linked

    LEAVE SYSTEM
        Leave
            → for Student / Teacher / Employee
            → approvedBy Admin

    LMS CONTENT
        LectureVideo
            → teacher + batch + subject
            → viewLogs[]
        Notes
            → teacher + subject + batch
        StudyMaterial
            → teacher + subject + batch

    ONLINE COURSE SYSTEM
        OnlineCoursePurchase
            → student
            → teacher
            → course
            → payment
            → progress + accessLogs

    CHAT SYSTEM
        ChatRoom
            → PRIVATE / GROUP / BATCH_GROUP / TEACHER_STUDENT
            → participants[]
            → lastMessage
        ChatMessage
            → sender = User
            → room = ChatRoom

    NOTIFICATION SYSTEM
        Notification
            → userId
            → type + message
            → meta info
