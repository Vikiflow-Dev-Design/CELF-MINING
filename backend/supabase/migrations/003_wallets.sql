-- Wallets table (for mobile app)
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    sendable_balance DECIMAL(20, 8) DEFAULT 0 CHECK (sendable_balance >= 0),
    non_sendable_balance DECIMAL(20, 8) DEFAULT 0 CHECK (non_sendable_balance >= 0),
    pending_balance DECIMAL(20, 8) DEFAULT 0 CHECK (pending_balance >= 0),
    total_balance DECIMAL(20, 8) GENERATED ALWAYS AS (sendable_balance + non_sendable_balance + pending_balance) STORED,
    current_address VARCHAR(255) NOT NULL,
    addresses JSONB DEFAULT '[]',
    preferences JSONB DEFAULT '{"currency": "CELF", "notifications": true}',
    last_exchange_rate DECIMAL(10, 6) DEFAULT 0.25,
    total_sent DECIMAL(20, 8) DEFAULT 0,
    total_received DECIMAL(20, 8) DEFAULT 0,
    total_mined DECIMAL(20, 8) DEFAULT 0,
    is_locked BOOLEAN DEFAULT false,
    lock_reason TEXT,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for wallets table
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_wallets_current_address ON wallets(current_address);
