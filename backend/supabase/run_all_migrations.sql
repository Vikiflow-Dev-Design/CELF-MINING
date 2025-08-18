-- CELF Backend Database Schema - Run All Migrations
-- Execute this file in Supabase SQL Editor to create all tables and setup

-- This file runs all migration files in the correct order
-- You can also run each migration file individually if preferred

-- 1. Extensions and basic setup
\i migrations/001_extensions.sql

-- 2. Core user management
\i migrations/002_users.sql

-- 3. Mobile app tables
\i migrations/003_wallets.sql
\i migrations/004_transactions.sql
\i migrations/005_mining_sessions.sql

-- 4. Website contact and support
\i migrations/006_contact_support.sql

-- 5. Website newsletter
\i migrations/007_newsletter.sql

-- 6. Website mentorship program
\i migrations/008_mentorship.sql

-- 7. Website scholarship program
\i migrations/009_scholarship.sql

-- 8. Database triggers and functions
\i migrations/010_triggers.sql

-- Migration complete
SELECT 'All migrations completed successfully!' as status;
