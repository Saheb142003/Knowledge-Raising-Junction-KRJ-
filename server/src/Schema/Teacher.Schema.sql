CREATE TABLE teacher (
    teacher_id SERIAL PRIMARY KEY,

    user_id INT,                   -- ref: User

    experience INT DEFAULT 0,
    total_subjects INT DEFAULT 0,
    total_students INT DEFAULT 0,
    ratings JSONB DEFAULT '[]',

    documents TEXT,
    available_today BOOLEAN,
    profile_complete BOOLEAN DEFAULT FALSE,
    documents_uploaded BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE teacher_routine (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    routine_id INT                  -- ref: Routine
);



CREATE TABLE teacher_employment (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    employment_id INT              -- ref: Employee
);



CREATE TABLE teacher_branch (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    branch_id INT                  -- ref: Branch
);


CREATE TABLE teacher_students (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    student_id INT                 -- ref: Student
);


CREATE TABLE teacher_attendance (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    attendance_id INT              -- ref: Attendance
);
