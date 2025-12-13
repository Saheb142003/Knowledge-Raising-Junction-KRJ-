CREATE TABLE routine_slots (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER NOT NULL REFERENCES branches(id) ON DELETE CASCADE,

    -- NOTICE: 'batch_id' is REMOVED from here. 
    -- We now use the 'slot_batch_assignments' table to link batches.

    -- When is it?
    day day_of_week NOT NULL,
    start_time TIME NOT NULL, 
    end_time TIME NOT NULL,

    -- What is happening?
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id INTEGER NOT NULL REFERENCES teachers(id) ON DELETE SET NULL,

    -- Metadata
    is_changed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Validation 1: Start must be before End
    CONSTRAINT check_valid_time CHECK (end_time > start_time),

    -- Validation 2: Teacher Double Booking Protection
    -- This ensures a teacher cannot be assigned to two different slots that overlap in time.
    EXCLUDE USING gist (
        teacher_id WITH =,
        day WITH =,
        tsrange(created_at::date + start_time, created_at::date + end_time) WITH &&
    )
);