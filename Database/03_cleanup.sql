-- ============================================
-- Database Cleanup Script
-- ============================================
-- Use this script to clean all data from tables
-- while preserving the schema structure
-- ============================================

-- Disable triggers temporarily to avoid constraint issues
SET session_replication_role = 'replica';

-- Truncate all tables (removes all data but keeps structure)
TRUNCATE TABLE listing CASCADE;
TRUNCATE TABLE "user" CASCADE;

-- Reset sequences to start from 1 again
ALTER SEQUENCE listing_id_seq RESTART WITH 1;
ALTER SEQUENCE user_id_seq RESTART WITH 1;

-- Re-enable triggers
SET session_replication_role = 'origin';

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✓ All data cleaned successfully';
    RAISE NOTICE '✓ Sequences reset to 1';
    RAISE NOTICE '✓ Schema structure preserved';
END $$;
