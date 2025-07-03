-- database/schema/006_create_academic_history_table.sql

-- This table can store a more permanent record of completed courses and grades,
-- potentially distinct from the 'enrollments' table which might track current status.
-- Could be populated from enrollments upon course completion.

CREATE TABLE IF NOT EXISTS academic_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    course_id UUID NOT NULL,
    course_title VARCHAR(255) NOT NULL, -- Denormalized for easier reporting
    grade VARCHAR(5) NOT NULL,
    completion_date DATE NOT NULL,
    credits_earned INTEGER NOT NULL CHECK (credits_earned > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_history_student
        FOREIGN KEY (student_id)
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_history_course
        FOREIGN KEY (course_id)
        REFERENCES courses (id)
        ON DELETE RESTRICT, -- Prevent deleting a course if it's in academic history
    -- Ensure a student only has one completed record for a specific course
    CONSTRAINT uc_student_completed_course UNIQUE (student_id, course_id)
);

-- Index for faster lookup of academic history by student
CREATE INDEX IF NOT EXISTS idx_academic_history_student_id ON academic_history (student_id);
CREATE INDEX IF NOT EXISTS idx_academic_history_course_id ON academic_history (course_id);
