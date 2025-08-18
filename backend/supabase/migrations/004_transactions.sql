-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hash VARCHAR(255) UNIQUE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('send', 'receive', 'mining', 'referral', 'exchange')),
    amount DECIMAL(20, 8) NOT NULL CHECK (amount >= 0),
    fee DECIMAL(20, 8) DEFAULT 0 CHECK (fee >= 0),
    from_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    from_address VARCHAR(255),
    to_address VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    description VARCHAR(200),
    session_id UUID, -- References mining_sessions
    mining_rate DECIMAL(10, 6),
    referral_id UUID,
    exchange_details JSONB,
    block_number BIGINT,
    confirmations INTEGER DEFAULT 0,
    gas_used BIGINT,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    processed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for transactions table
CREATE INDEX idx_transactions_from_user_id ON transactions(from_user_id);
CREATE INDEX idx_transactions_to_user_id ON transactions(to_user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_hash ON transactions(hash);
CREATE INDEX idx_transactions_session_id ON transactions(session_id);

-- Compound indexes for common queries
CREATE INDEX idx_transactions_from_user_type_status ON transactions(from_user_id, type, status);
CREATE INDEX idx_transactions_to_user_type_status ON transactions(to_user_id, type, status);
