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
    reference_contacts JSONB NOT NULL,
    
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

-- Indexes for scholarship tables
CREATE INDEX idx_scholarship_applications_email ON scholarship_applications(email);
CREATE INDEX idx_scholarship_applications_status ON scholarship_applications(status);
CREATE INDEX idx_scholarship_applications_created_at ON scholarship_applications(created_at);

CREATE INDEX idx_scholarship_awards_application_id ON scholarship_awards(application_id);
CREATE INDEX idx_scholarship_awards_status ON scholarship_awards(status);
CREATE INDEX idx_scholarship_awards_awarded_at ON scholarship_awards(awarded_at);

CREATE INDEX idx_scholarship_disbursements_award_id ON scholarship_disbursements(award_id);
CREATE INDEX idx_scholarship_disbursements_status ON scholarship_disbursements(status);
CREATE INDEX idx_scholarship_disbursements_scheduled_date ON scholarship_disbursements(scheduled_date);
