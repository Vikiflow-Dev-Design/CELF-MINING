-- CELF Backend Database Schema for Supabase
-- ⚠️  DEPRECATED: This monolithic schema file is deprecated
--
-- Please use the new migration files in the migrations/ directory instead:
-- - migrations/001_extensions.sql through migrations/010_triggers.sql
-- - Or run run_all_migrations.sql for all migrations at once
--
-- This file is kept for reference only and should not be used for new setups.
--
-- Run this SQL in your Supabase SQL editor to create all necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (simplified without authentication)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    profile_image_url TEXT,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{"notifications": {"email": true, "push": true}, "theme": "auto", "language": "en"}',
    profile JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Contact submissions table (for website)
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(200),
    inquiry_type VARCHAR(50) NOT NULL CHECK (inquiry_type IN ('general', 'technical', 'partnership', 'media', 'other')),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    response TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets table (for website)
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('technical', 'account', 'mining', 'wallet', 'general')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    device_info JSONB,
    attachments JSONB DEFAULT '[]',
    responses JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions table (for website)
CREATE TABLE newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    preferences JSONB DEFAULT '{"frequency": "weekly", "topics": [], "format": "html"}',
    unsubscribe_token VARCHAR(255) UNIQUE,
    unsubscribe_reason TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter campaigns table (for website admin)
CREATE TABLE newsletter_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    target_audience JSONB DEFAULT '{}',
    stats JSONB DEFAULT '{"sent": 0, "opened": 0, "clicked": 0, "bounced": 0}',
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mentorship applications table (for website)
CREATE TABLE mentorship_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('mentor', 'mentee')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    
    -- Common fields
    availability JSONB NOT NULL,
    
    -- Mentor-specific fields
    education TEXT,
    experience TEXT,
    expertise JSONB,
    motivation TEXT,
    linkedin_profile VARCHAR(500),
    resume_url VARCHAR(500),
    
    -- Mentee-specific fields
    current_education TEXT,
    goals TEXT,
    interests JSONB,
    challenges TEXT,
    
    review_notes TEXT,
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mentorship connections table
CREATE TABLE mentorship_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID REFERENCES mentorship_applications(id) ON DELETE CASCADE,
    mentee_id UUID REFERENCES mentorship_applications(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'active', 'completed')),
    connected_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mentorship sessions table
CREATE TABLE mentorship_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    connection_id UUID REFERENCES mentorship_connections(id) ON DELETE CASCADE,
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes BETWEEN 15 AND 180),
    topic VARCHAR(200) NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
    notes TEXT,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scholarship applications table (for website)
CREATE TABLE scholarship_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    address JSONB NOT NULL,
    wallet_address VARCHAR(255) NOT NULL,
    token_balance DECIMAL(20, 8) NOT NULL CHECK (token_balance >= 1000),
    
    -- Educational information
    current_education JSONB NOT NULL,
    academic_records JSONB NOT NULL,
    study_plan TEXT NOT NULL,
    career_goals TEXT NOT NULL,
    
    -- Financial information
    financial_need TEXT NOT NULL,
    household_income DECIMAL(12, 2),
    other_scholarships JSONB DEFAULT '[]',
    
    -- Essays
    personal_statement TEXT NOT NULL,
    why_celf TEXT NOT NULL,
    
    -- References
    references JSONB NOT NULL,
    
    -- Documents
    documents JSONB DEFAULT '{}',
    
    -- Application status
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected', 'waitlisted')),
    score DECIMAL(5, 2) CHECK (score BETWEEN 0 AND 100),
    review_notes TEXT,
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scholarship awards table
CREATE TABLE scholarship_awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES scholarship_applications(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount >= 100),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    disbursement_schedule JSONB NOT NULL,
    conditions JSONB DEFAULT '[]',
    awarded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scholarship disbursements table
CREATE TABLE scholarship_disbursements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    award_id UUID REFERENCES scholarship_awards(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    scheduled_date DATE NOT NULL,
    disbursed_date DATE,
    method VARCHAR(50) NOT NULL CHECK (method IN ('bank_transfer', 'check', 'digital_wallet')),
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'processing', 'completed', 'failed')),
    transaction_reference VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_wallets_current_address ON wallets(current_address);

CREATE INDEX idx_transactions_from_user_id ON transactions(from_user_id);
CREATE INDEX idx_transactions_to_user_id ON transactions(to_user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

CREATE INDEX idx_mining_sessions_user_id ON mining_sessions(user_id);
CREATE INDEX idx_mining_sessions_status ON mining_sessions(status);
CREATE INDEX idx_mining_sessions_created_at ON mining_sessions(created_at);

CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

CREATE INDEX idx_support_tickets_email ON support_tickets(email);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_created_at ON support_tickets(created_at);

CREATE INDEX idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_subscriptions_status ON newsletter_subscriptions(status);

CREATE INDEX idx_mentorship_applications_email ON mentorship_applications(email);
CREATE INDEX idx_mentorship_applications_type ON mentorship_applications(type);
CREATE INDEX idx_mentorship_applications_status ON mentorship_applications(status);

CREATE INDEX idx_scholarship_applications_email ON scholarship_applications(email);
CREATE INDEX idx_scholarship_applications_status ON scholarship_applications(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mining_sessions_updated_at BEFORE UPDATE ON mining_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_subscriptions_updated_at BEFORE UPDATE ON newsletter_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_campaigns_updated_at BEFORE UPDATE ON newsletter_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentorship_applications_updated_at BEFORE UPDATE ON mentorship_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentorship_connections_updated_at BEFORE UPDATE ON mentorship_connections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentorship_sessions_updated_at BEFORE UPDATE ON mentorship_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scholarship_applications_updated_at BEFORE UPDATE ON scholarship_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scholarship_awards_updated_at BEFORE UPDATE ON scholarship_awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scholarship_disbursements_updated_at BEFORE UPDATE ON scholarship_disbursements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
