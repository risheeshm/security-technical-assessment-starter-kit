-- ============================================
-- Useful Database Queries
-- ============================================
-- Common queries for testing and debugging
-- ============================================

-- View all users
SELECT id, name, email, role, created_at 
FROM "user" 
ORDER BY id;

-- View all listings with owner information
SELECT 
    l.id,
    l.title,
    l.type,
    l.price,
    l.bedrooms,
    l.bathrooms,
    l.sqft,
    l.address,
    u.name as owner_name,
    u.email as owner_email
FROM listing l
LEFT JOIN "user" u ON l."ownerId" = u.id
ORDER BY l.id;

-- View statistics by listing type
SELECT 
    type,
    COUNT(*) as count,
    ROUND(AVG(price), 2) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price
FROM listing
GROUP BY type;

-- Search listings by keyword (similar to backend search)
SELECT id, title, description, price, address, type
FROM listing
WHERE 
    title ILIKE '%modern%' 
    OR description ILIKE '%modern%' 
    OR address ILIKE '%modern%'
ORDER BY id;

-- View listings by type
SELECT id, title, price, bedrooms, bathrooms, address
FROM listing
WHERE type = 'sale'  -- or 'rent'
ORDER BY price DESC;

-- View listings in price range
SELECT id, title, price, type, bedrooms, bathrooms
FROM listing
WHERE price BETWEEN 500000 AND 1000000
ORDER BY price;

-- View most expensive listings
SELECT id, title, price, type, address
FROM listing
ORDER BY price DESC
LIMIT 5;

-- View user's listings
SELECT 
    u.name as owner,
    l.title,
    l.type,
    l.price,
    l.address
FROM listing l
JOIN "user" u ON l."ownerId" = u.id
WHERE u.email = 'jane.smith@example.com'
ORDER BY l.created_at DESC;

-- Database summary
SELECT 
    'Users' as table_name, 
    COUNT(*) as count 
FROM "user"
UNION ALL
SELECT 
    'Listings', 
    COUNT(*) 
FROM listing
UNION ALL
SELECT 
    'For Sale', 
    COUNT(*) 
FROM listing 
WHERE type = 'sale'
UNION ALL
SELECT 
    'For Rent', 
    COUNT(*) 
FROM listing 
WHERE type = 'rent';
