-- SQL Script for 'products' table schema
-- This script defines the 'products' table as per the architectural design.
-- It is intended for reference or manual database setup if not using Docker Compose and Alembic.

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL CHECK (stock_quantity >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Add an index on the 'name' column for faster lookups
CREATE INDEX idx_products_name ON products (name);

-- Optional: Add a trigger to automatically update 'updated_at' on row modification
-- This requires a function to be created first (PostgreSQL specific)

-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--    NEW.updated_at = NOW();
--    RETURN NEW;
-- END;
-- $$ language 'plpgsql';

-- CREATE TRIGGER update_products_updated_at
-- BEFORE UPDATE ON products
-- FOR EACH ROW
-- EXECUTE FUNCTION update_updated_at_column();
