-- Extensions and basic setup
-- Run this first to enable required extensions

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable other useful extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- For encryption functions if needed
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- For text search if needed
