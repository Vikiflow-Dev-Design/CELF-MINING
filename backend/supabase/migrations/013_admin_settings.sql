-- Admin settings table for system configuration
CREATE TABLE IF NOT EXISTS admin_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'general',
    is_active BOOLEAN DEFAULT true,
    created_by UUID,
    updated_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default mining settings (only if they don't exist)
INSERT INTO admin_settings (setting_key, setting_value, description, category)
SELECT setting_key, setting_value::jsonb, description, category FROM (VALUES
  ('mining_default_rate', '1.0', 'Default mining rate in CELF per hour', 'mining'),
  ('mining_max_session_time', '3600', 'Maximum mining session time in seconds', 'mining'),
  ('mining_speed_multiplier', '1.0', 'Mining speed multiplier', 'mining'),
  ('mining_reward_multiplier', '1.0', 'Mining reward multiplier', 'mining'),
  ('mining_maintenance_mode', 'false', 'Mining maintenance mode status', 'mining'),
  ('mining_min_tokens', '0.01', 'Minimum tokens to mine', 'mining'),
  ('mining_max_tokens_per_session', '100', 'Maximum tokens per mining session', 'mining'),
  ('mining_cooldown_period', '0', 'Cooldown period between sessions in seconds', 'mining'),
  ('mining_daily_limit', '1000', 'Maximum tokens per user per day', 'mining'),
  ('mining_referral_bonus', '0.1', 'Bonus multiplier for referrals', 'mining'),
  ('mining_auto_claim', 'true', 'Auto-claim earnings at session end', 'mining'),
  ('mining_notification_enabled', 'true', 'Enable mining notifications', 'mining'),
  ('system_site_name', '"CELF Platform"', 'Site name', 'system'),
  ('system_registration_enabled', 'true', 'User registration enabled', 'system'),
  ('system_mining_enabled', 'true', 'Mining system enabled', 'system'),
  ('system_max_users_per_day', '1000', 'Maximum users per day', 'system'),
  ('system_email_notifications', 'true', 'Email notifications enabled', 'system')
) AS new_settings(setting_key, setting_value, description, category)
WHERE NOT EXISTS (
  SELECT 1 FROM admin_settings WHERE admin_settings.setting_key = new_settings.setting_key
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_settings_key ON admin_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_admin_settings_category ON admin_settings(category);
CREATE INDEX IF NOT EXISTS idx_admin_settings_active ON admin_settings(is_active);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_admin_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_admin_settings_updated_at
    BEFORE UPDATE ON admin_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_settings_updated_at();
