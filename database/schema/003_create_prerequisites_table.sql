-- database/schema/003_create_prerequisites_table.sql

CREATE TABLE IF NOT EXISTS prerequisites (
    course_id UUID NOT NULL,
    prerequisite_course_id UUID NOT NULL,
    PRIMARY KEY (course_id, prerequisite_course_id),
    CONSTRAINT fk_course
        FOREIGN KEY (course_id)
        REFERENCES courses (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_prerequisite_course
        FOREIGN KEY (prerequisite_course_id)
        REFERENCES courses (id)
        ON DELETE CASCADE,
    -- A course cannot be its own prerequisite
    CONSTRAINT chk_self_prerequisite CHECK (course_id != prerequisite_course_id)
);

-- Index for faster lookup of prerequisites for a given course
CREATE INDEX IF NOT EXISTS idx_prerequisites_course_id ON prerequisites (course_id);
-- Index for faster lookup of courses that have a specific prerequisite
CREATE INDEX IF NOT EXISTS idx_prerequisites_prereq_course_id ON prerequisites (prerequisite_course_id);
