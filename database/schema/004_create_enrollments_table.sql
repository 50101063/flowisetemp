-- database/schema/004_create_enrollments_table.sql

CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    course_id UUID NOT NULL,
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'registered', 'dropped', 'completed', 'failed'
    grade VARCHAR(5), -- NULL until course completion
    payment_id UUID, -- Foreign key to payments table
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_student
        FOREIGN KEY (student_id)
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_course
        FOREIGN KEY (course_id)
        REFERENCES courses (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_payment
        FOREIGN KEY (payment_id)
        REFERENCES payments (id)
        ON DELETE SET NULL, -- If a payment record is deleted, set enrollment's payment_id to NULL
    -- Ensure a student can only be enrolled in a course once (unique active enrollment)
    CONSTRAINT uc_student_course UNIQUE (student_id, course_id)
);

-- Index for faster lookup of enrollments by student and course
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments (student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments (course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments (status);
