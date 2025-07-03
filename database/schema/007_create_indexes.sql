-- database/schema/007_create_indexes.sql
-- This file is for additional/composite indexes or specific index types
-- that might be beneficial for common queries not covered by individual table scripts.
-- Indexes are crucial for performance, especially for filtering, joining, and ordering data.

-- Example of a composite index for common queries
-- For finding courses by instructor and date range
CREATE INDEX IF NOT EXISTS idx_courses_instructor_date_range ON courses (instructor_id, start_date, end_date);

-- For quickly finding a student's pending or registered enrollments
CREATE INDEX IF NOT EXISTS idx_enrollments_student_status ON enrollments (student_id, status);

-- For faster lookups of payments by status and date range
CREATE INDEX IF NOT EXISTS idx_payments_status_date ON payments (status, payment_date);

-- For efficient join operations between users and enrollments
-- (Already covered by individual FK indexes, but good to think about query patterns)

-- For full-text search on course titles and descriptions (if needed, would require tsvector column)
-- This is an example, actual implementation would involve adding a tsvector column and populating it.
-- ALTER TABLE courses ADD COLUMN ts_vector_column TSVECTOR;
-- CREATE INDEX IF NOT EXISTS idx_courses_fulltext ON courses USING GIN (ts_vector_column);
-- For now, relying on LIKE or ILIKE for basic search as per requirements.

-- Add any other specific indexes here based on anticipated query patterns and performance analysis.
