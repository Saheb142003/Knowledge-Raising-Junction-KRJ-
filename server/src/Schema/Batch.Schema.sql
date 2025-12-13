/* ============================================================
   KRJ COACHING SYSTEM - SCHEDULING & BATCHES MODULE
   ============================================================ */

-- 1. THE BATCHES TABLE
CREATE TABLE batches (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    
    -- Basic Info
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(20) NOT NULL,
    
    -- Schedule
    start_date DATE NOT NULL,
    end_date DATE,
    
    -- Mentor/Monitor
    mentor_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,

    -- STUDENT CAPACITIES (Auto-Calculated)
    student_capacity INTEGER DEFAULT 60, 
    current_student_count INTEGER DEFAULT 0,
    remaining_student_capacity INTEGER GENERATED ALWAYS AS (
        student_capacity - current_student_count
    ) STORED,

    -- TEACHER CAPACITIES
    teacher_capacity INTEGER DEFAULT 10,
    current_teacher_count INTEGER DEFAULT 0,
    remaining_teacher_capacity INTEGER GENERATED ALWAYS AS (
        teacher_capacity - current_teacher_count
    ) STORED,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (branch_id, name),
    CONSTRAINT check_pos_std CHECK (current_student_count >= 0),
    CONSTRAINT check_pos_tch CHECK (current_teacher_count >= 0)
);

CREATE INDEX idx_batches_branch ON batches(branch_id);


-- ==========================================================
-- 2. THE MISSING LINK: BATCH_SUBJECTS (Added per your request)
-- ==========================================================
-- This table defines WHICH subjects a batch is learning and their progress.

CREATE TABLE batch_subjects (
    id SERIAL PRIMARY KEY,
    
    -- The Core Link
    batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    
    -- Specific Teacher for THIS Batch (e.g. Rahul Sir for Batch A Physics)
    primary_teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
    
    -- Progress & Status Tracking
    syllabus_completion_percentage INTEGER DEFAULT 0 CHECK (syllabus_completion_percentage BETWEEN 0 AND 100),
    status VARCHAR(20) DEFAULT 'ONGOING', -- ONGOING, COMPLETED, HOLD
    
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Constraint: Cannot add "Physics" to "Batch A" twice
    UNIQUE (batch_id, subject_id)
);

CREATE INDEX idx_batch_subjects_lookup ON batch_subjects(batch_id);


-- ==========================================================
-- 3. THE ROUTINE SLOTS TABLE (Time Slots)
-- ==========================================================
-- Note: Ensure ENUM 'day_of_week' is created before running this.
-- CREATE TYPE day_of_week AS ENUM ('MONDAY', 'TUESDAY', ...);

CREATE TABLE routine_slots (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER NOT NULL REFERENCES branches(id) ON DELETE CASCADE,

    -- When is it?
    day day_of_week NOT NULL,
    start_time TIME NOT NULL, 
    end_time TIME NOT NULL,
    
    -- What is happening?
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id INTEGER NOT NULL REFERENCES teachers(id) ON DELETE SET NULL,

    is_changed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT check_valid_time CHECK (end_time > start_time),
    
    -- Prevent Teacher Double Booking
    EXCLUDE USING gist (
        teacher_id WITH =,
        day WITH =,
        tsrange(created_at::date + start_time, created_at::date + end_time) WITH &&
    )
);


-- ==========================================================
-- 4. THE SLOT-BATCH ASSIGNMENT (Scheduling Link)
-- ==========================================================
-- This allows one slot to be attended by multiple batches.

CREATE TABLE slot_batch_assignments (
    id SERIAL PRIMARY KEY,
    
    routine_slot_id INTEGER NOT NULL REFERENCES routine_slots(id) ON DELETE CASCADE,
    batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Ensure a batch isn't added twice to the same slot
    UNIQUE (routine_slot_id, batch_id)
);

CREATE INDEX idx_slot_batches_batch ON slot_batch_assignments(batch_id);