-- Mobile Mining Enhancements
-- Add fields needed for mobile app mining with 24-hour sessions

-- Add new columns to mining_sessions table for mobile mining
ALTER TABLE mining_sessions 
ADD COLUMN IF NOT EXISTS session_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS max_duration_ms BIGINT DEFAULT 86400000, -- 24 hours in milliseconds
ADD COLUMN IF NOT EXISTS remaining_time_ms BIGINT DEFAULT 86400000,
ADD COLUMN IF NOT EXISTS device_info JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS validation_data JSONB DEFAULT '{"last_validated_at": null, "validation_count": 0, "suspicious_activity": false, "flagged_reasons": []}',
ADD COLUMN IF NOT EXISTS completion_data JSONB DEFAULT '{"final_earnings": 0, "actual_duration_ms": 0, "completed_at": null, "synced_to_wallet": false, "transaction_id": null}',
ADD COLUMN IF NOT EXISTS server_time TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update status enum to include mobile mining statuses
ALTER TABLE mining_sessions 
DROP CONSTRAINT IF EXISTS mining_sessions_status_check;

ALTER TABLE mining_sessions 
ADD CONSTRAINT mining_sessions_status_check 
CHECK (status IN ('created', 'active', 'paused', 'completed', 'failed', 'cancelled', 'expired'));

-- Update mining_rate default to mobile app rate
ALTER TABLE mining_sessions 
ALTER COLUMN mining_rate SET DEFAULT 0.125;

-- Add indexes for mobile mining queries
CREATE INDEX IF NOT EXISTS idx_mining_sessions_session_id ON mining_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_mining_sessions_user_status ON mining_sessions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_mining_sessions_device_id ON mining_sessions USING GIN (device_info);
CREATE INDEX IF NOT EXISTS idx_mining_sessions_device_id_text ON mining_sessions((device_info->>'deviceId'));

-- Add function to auto-complete expired sessions
CREATE OR REPLACE FUNCTION auto_complete_expired_mining_sessions()
RETURNS void AS $$
BEGIN
    UPDATE mining_sessions 
    SET 
        status = 'expired',
        completed_at = started_at + INTERVAL '24 hours',
        tokens_earned = CASE 
            WHEN started_at IS NOT NULL THEN 
                EXTRACT(EPOCH FROM (started_at + INTERVAL '24 hours' - started_at)) / 3600 * mining_rate
            ELSE 0
        END,
        runtime_seconds = 86400, -- 24 hours in seconds
        completion_data = jsonb_set(
            completion_data,
            '{completed_at}',
            to_jsonb(started_at + INTERVAL '24 hours')
        )
    WHERE 
        status = 'active' 
        AND started_at IS NOT NULL 
        AND started_at + INTERVAL '24 hours' <= NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically generate session_id if not provided
CREATE OR REPLACE FUNCTION generate_session_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.session_id IS NULL THEN
        NEW.session_id := 'session_' || encode(gen_random_bytes(16), 'hex');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_session_id
    BEFORE INSERT ON mining_sessions
    FOR EACH ROW
    EXECUTE FUNCTION generate_session_id();

-- Create a trigger to update remaining_time_ms
CREATE OR REPLACE FUNCTION update_remaining_time()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'active' AND NEW.started_at IS NOT NULL THEN
        NEW.remaining_time_ms := GREATEST(
            0,
            NEW.max_duration_ms - EXTRACT(EPOCH FROM (NOW() - NEW.started_at)) * 1000
        );
    ELSIF NEW.status != 'active' THEN
        NEW.remaining_time_ms := 0;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_remaining_time
    BEFORE UPDATE ON mining_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_remaining_time();

-- Add function to calculate current earnings for active sessions
CREATE OR REPLACE FUNCTION calculate_current_earnings(session_row mining_sessions)
RETURNS DECIMAL(20, 8) AS $$
BEGIN
    IF session_row.status != 'active' OR session_row.started_at IS NULL THEN
        RETURN session_row.tokens_earned;
    END IF;
    
    RETURN LEAST(
        EXTRACT(EPOCH FROM (NOW() - session_row.started_at)) / 3600 * session_row.mining_rate,
        session_row.max_duration_ms / 1000 / 3600 * session_row.mining_rate
    );
END;
$$ LANGUAGE plpgsql;

-- Add RPC function for mobile app to get mining status
CREATE OR REPLACE FUNCTION get_mining_status(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    session_record mining_sessions%ROWTYPE;
    current_earnings DECIMAL(20, 8);
    runtime_seconds INTEGER;
    result JSON;
BEGIN
    -- Get active session
    SELECT * INTO session_record
    FROM mining_sessions 
    WHERE user_id = user_uuid AND status = 'active'
    LIMIT 1;
    
    IF NOT FOUND THEN
        RETURN json_build_object(
            'isActive', false,
            'currentRate', 0.125,
            'tokensEarned', 0,
            'runtime', 0,
            'status', 'stopped',
            'serverTime', NOW()
        );
    END IF;
    
    -- Calculate current earnings and runtime
    current_earnings := calculate_current_earnings(session_record);
    runtime_seconds := COALESCE(
        EXTRACT(EPOCH FROM (NOW() - session_record.started_at))::INTEGER,
        0
    );
    
    RETURN json_build_object(
        'isActive', true,
        'currentRate', session_record.mining_rate,
        'tokensEarned', current_earnings,
        'runtime', runtime_seconds,
        'status', 'active',
        'sessionId', session_record.session_id,
        'remainingTimeMs', session_record.remaining_time_ms,
        'progress', LEAST(100, (runtime_seconds::DECIMAL / 86400) * 100),
        'serverTime', NOW()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_mining_status(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION calculate_current_earnings(mining_sessions) TO authenticated;

-- Add comment to document the mobile mining enhancements
COMMENT ON TABLE mining_sessions IS 'Mining sessions table enhanced for mobile app with 24-hour sessions, server-side calculations, and anti-cheat features';
