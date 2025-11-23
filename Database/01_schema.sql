-- ============================================
-- Real Estate Marketplace Database Schema (DDL)
-- ============================================
-- This script creates all tables and relationships
-- for the Real Estate Marketplace application
-- ============================================

-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS listing CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- ============================================
-- Table: user
-- Description: Stores registered user accounts
-- ============================================
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on email for faster lookups during authentication
CREATE INDEX idx_user_email ON "user"(email);

-- ============================================
-- Table: listing
-- Description: Stores property listings
-- ============================================
CREATE TABLE listing (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    address TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('sale', 'rent')),
    bedrooms INTEGER NOT NULL CHECK (bedrooms >= 0),
    bathrooms INTEGER NOT NULL CHECK (bathrooms >= 0),
    sqft INTEGER NOT NULL CHECK (sqft > 0),
    "imageUrl" VARCHAR(500),
    "ownerId" INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_owner FOREIGN KEY ("ownerId") REFERENCES "user"(id) ON DELETE SET NULL
);

-- Indexes for better query performance
CREATE INDEX idx_listing_type ON listing(type);
CREATE INDEX idx_listing_owner ON listing("ownerId");
CREATE INDEX idx_listing_price ON listing(price);

-- Full-text search indexes for search functionality
CREATE INDEX idx_listing_title ON listing USING gin(to_tsvector('english', title));
CREATE INDEX idx_listing_description ON listing USING gin(to_tsvector('english', description));
CREATE INDEX idx_listing_address ON listing USING gin(to_tsvector('english', address));

-- ============================================
-- Comments for documentation
-- ============================================
COMMENT ON TABLE "user" IS 'Stores registered user accounts with authentication details';
COMMENT ON COLUMN "user".role IS 'User role: user, admin, agent, etc.';
COMMENT ON COLUMN "user".password IS 'Plaintext password (VULNERABLE)';

COMMENT ON TABLE listing IS 'Stores property listings for sale or rent';
COMMENT ON COLUMN listing.type IS 'Listing type: sale or rent';
COMMENT ON COLUMN listing.price IS 'Price in USD (sale price or monthly rent)';
COMMENT ON COLUMN listing.sqft IS 'Square footage of the property';
COMMENT ON COLUMN listing."imageUrl" IS 'URL to property image (optional)';

-- ============================================
-- Success message
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✓ Database schema created successfully';
    RAISE NOTICE '✓ Tables: user, listing';
    RAISE NOTICE '✓ Indexes created for optimal performance';
    RAISE NOTICE '✓ Foreign key constraints established';
END $$;
