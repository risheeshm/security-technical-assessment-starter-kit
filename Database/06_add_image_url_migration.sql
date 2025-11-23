-- ============================================
-- Migration: Add image_url Column to listing Table
-- ============================================
-- This migration adds the image_url column to existing databases
-- Safe to run multiple times (idempotent)
-- ============================================

-- Check if column exists, add it if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'listing' 
        AND column_name = 'imageUrl'
    ) THEN
        ALTER TABLE listing ADD COLUMN "imageUrl" VARCHAR(500);
        RAISE NOTICE '✓ Added imageUrl column to listing table';
    ELSE
        RAISE NOTICE '→ imageUrl column already exists, skipping';
    END IF;
END $$;

-- Add comment for the new column
COMMENT ON COLUMN listing."imageUrl" IS 'URL to property image (optional)';

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✓ Migration completed successfully';
    RAISE NOTICE '  Database is now up to date with image support';
END $$;
