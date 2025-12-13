-- 1. THE ASSIGNMENTS TABLE (The Task itself)
-- Defines: "Physics Homework for Batch A, Due Friday"
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    
    -- Link to the specific Subject in a specific Batch
    batch_subject_id INTEGER NOT NULL REFERENCES batch_subjects(id) ON DELETE CASCADE,
    
    created_by INTEGER NOT NULL REFERENCES teachers(id) ON DELETE SET NULL,
    
    title VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- Important Academic Fields
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    max_marks INTEGER DEFAULT 100,
    
    -- Attachment (e.g., The Question Paper PDF)
    question_file_url TEXT, 
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. THE SUBMISSIONS TABLE (Student's Work)
-- Defines: "Rahul from Batch A submitted his PDF on Thursday"
CREATE TABLE assignment_submissions (
    id SERIAL PRIMARY KEY,
    
    assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    
    -- The Submission
    submission_file_url TEXT, -- Link to their answer PDF/Image
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Grading (Teacher fills this later)
    marks_obtained INTEGER,
    teacher_feedback TEXT,
    
    -- Status
    status VARCHAR(20) DEFAULT 'SUBMITTED', -- SUBMITTED, GRADED, LATE
    
    -- Constraint: Student can only submit ONCE per assignment (optional)
    UNIQUE (assignment_id, student_id)
);

-- Index for fast lookup: "Show me all assignments for Batch A"
CREATE INDEX idx_assignments_lookup ON assignments(batch_subject_id);