-- database/schema/005_create_payments_table.sql

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID UNIQUE NOT NULL, -- One-to-one with enrollment
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    payment_method VARCHAR(50), -- e.g., 'credit_card', 'paypal'
    transaction_id VARCHAR(255) UNIQUE, -- Transaction ID from payment gateway (Stripe)
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_enrollment
        FOREIGN KEY (enrollment_id)
        REFERENCES enrollments (id)
        ON DELETE CASCADE -- If enrollment is deleted, delete payment record
);

-- Index for faster lookup by transaction ID and status
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments (transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments (status);
CREATE INDEX IF NOT EXISTS idx_payments_enrollment_id ON payments (enrollment_id);
