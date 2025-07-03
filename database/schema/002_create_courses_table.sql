-- database/schema/002_create_courses_table.sql

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    credits INTEGER NOT NULL CHECK (credits > 0),
    max_capacity INTEGER NOT NULL CHECK (max_capacity > 0),
    current_enrollment INTEGER DEFAULT 0 CHECK (current_enrollment >= 0 AND current_enrollment <= max_capacity),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    schedule VARCHAR(255), -- e.g., 'MWF 10:00-10:50 AM'
    instructor_id UUID, -- Foreign key to users table (instructor role)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_instructor
        FOREIGN KEY (instructor_id)
        REFERENCES users (id)
        ON DELETE SET NULL -- If an instructor is deleted, set their courses' instructor_id to NULL
);

-- Index for faster lookup by course code and title
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses (course_code);
CREATE INDEX IF NOT EXISTS idx_courses_title ON courses (title);
CREATE INDEX IF NOT EXISTS idx_courses_instructor_id ON courses (instructor_id);
