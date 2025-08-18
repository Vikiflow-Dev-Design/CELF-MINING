-- Mining sessions table (for mobile app)
CREATE TABLE mining_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(20) DEFAULT 'created' CHECK (status IN ('created', 'active', 'paused', 'completed', 'failed', 'cancelled')),
    mining_rate DECIMAL(10, 6) DEFAULT 1.0,
    tokens_earned DECIMAL(20, 8) DEFAULT 0,
    runtime_seconds INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE,
    paused_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    achievements JSONB DEFAULT '[]',
    milestones JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for mining_sessions table
CREATE INDEX idx_mining_sessions_user_id ON mining_sessions(user_id);
CREATE INDEX idx_mining_sessions_status ON mining_sessions(status);
CREATE INDEX idx_mining_sessions_created_at ON mining_sessions(created_at);
