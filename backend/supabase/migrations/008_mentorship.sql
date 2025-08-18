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

-- Indexes for mentorship tables
CREATE INDEX idx_mentorship_applications_email ON mentorship_applications(email);
CREATE INDEX idx_mentorship_applications_type ON mentorship_applications(type);
CREATE INDEX idx_mentorship_applications_status ON mentorship_applications(status);

CREATE INDEX idx_mentorship_connections_mentor_id ON mentorship_connections(mentor_id);
CREATE INDEX idx_mentorship_connections_mentee_id ON mentorship_connections(mentee_id);
CREATE INDEX idx_mentorship_connections_status ON mentorship_connections(status);

CREATE INDEX idx_mentorship_sessions_connection_id ON mentorship_sessions(connection_id);
CREATE INDEX idx_mentorship_sessions_scheduled_for ON mentorship_sessions(scheduled_for);
CREATE INDEX idx_mentorship_sessions_status ON mentorship_sessions(status);
