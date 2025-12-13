/* ============================================================
   UPDATED SCHEMA WITH BATCH LOGIC
   ============================================================ */

-- 0. ENUMS
CREATE TYPE material_type AS ENUM ('NOTES', 'ASSIGNMENT', 'TEST_PAPER', 'VIDEO_LINK', 'ANNOUNCEMENT');

-- 1. SUBJECTS (Standard Definition)
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL, 
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_subject_code_per_branch UNIQUE (code, branch_id) 
);

-- 2. BATCHES (NEW: The core grouping entity)
CREATE TABLE batches (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL, -- e.g. "Target JEE 2026 - Batch A"
    code VARCHAR(20) NOT NULL,
    
    start_date DATE NOT NULL,
    end_date DATE,
    
    -- Capacity Logic
    student_capacity INTEGER DEFAULT 60,
    current_student_count INTEGER DEFAULT 0,
    remaining_student_capacity INTEGER GENERATED ALWAYS AS (student_capacity - current_student_count) STORED,

    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (branch_id, name)
);

-- 3. BATCH_SUBJECTS (NEW: Replaces individual student enrollments)
-- Links a Batch to the Subjects it studies.
CREATE TABLE batch_subjects (
    id SERIAL PRIMARY KEY,
    batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    
    -- "Who teaches Physics to THIS batch?"
    -- This overrides the generic teacher list if needed.
    primary_teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
    
    syllabus_completion_percentage INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ONGOING',
    
    UNIQUE (batch_id, subject_id)
);

-- 4. TEACHER ASSIGNMENTS (General Subject Experts)
-- Keeps a list of who CAN teach a subject (e.g., Rahul is a Physics teacher)
CREATE TABLE subject_assignments (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id INTEGER NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    is_primary_teacher BOOLEAN DEFAULT FALSE, 
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (subject_id, teacher_id)
);

-- 5. STUDENTS (Updated to include Batch)
-- Note: Run ALTER TABLE if this table already exists
ALTER TABLE students 
ADD COLUMN batch_id INTEGER REFERENCES batches(id) ON DELETE SET NULL;

-- 6. MATERIALS (Unchanged)
CREATE TABLE subject_materials (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    uploaded_by INTEGER NOT NULL REFERENCES teachers(id),
    
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category material_type NOT NULL DEFAULT 'NOTES',
    
    file_attachments JSONB DEFAULT '[]'::jsonb, 
    
    is_visible_to_students BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Indexes
CREATE INDEX idx_subjects_code ON subjects(code);
CREATE INDEX idx_materials_subject ON subject_materials(subject_id);
CREATE INDEX idx_batch_subjects_batch ON batch_subjects(batch_id);