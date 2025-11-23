-- ============================================
-- Real Estate Marketplace - Sample Data
-- ============================================
-- This script populates the database with sample
-- users and property listings for testing/demo
-- ============================================

INSERT INTO "user" (name, email, password, role) VALUES
('John Doe', 'john.doe@example.com', 'password123', 'user'),
('Jane Smith', 'jane.smith@example.com', 'securePass456', 'agent'),
('Admin User', 'admin@example.com', 'admin123', 'admin'),
('Sarah Johnson', 'sarah.j@example.com', 'password123', 'user'),
('Mike Wilson', 'mike.w@example.com', 'password123', 'agent');

-- Insert Listings
INSERT INTO listing (title, description, price, address, type, bedrooms, bathrooms, sqft, "imageUrl", "ownerId") VALUES
(
    'Modern Downtown Apartment',
    'Stunning modern apartment in the heart of downtown. Features include hardwood floors, stainless steel appliances, and floor-to-ceiling windows with breathtaking city views. Walking distance to restaurants, shops, and public transit.',
    850000.00,
    '123 Main Street, Apt 4B, New York, NY 10001',
    'sale',
    2,
    2,
    1200,
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    2
),
(
    'Luxury Beachfront Villa',
    'Exquisite beachfront villa with panoramic ocean views. This stunning property features an infinity pool, private beach access, gourmet kitchen, and expansive outdoor living spaces. Perfect for luxury living and entertaining.',
    2500000.00,
    '456 Ocean Drive, Malibu, CA 90265',
    'sale',
    5,
    4,
    4500,
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    2
),
(
    'Charming Victorian Home',
    'Beautiful Victorian-style home with original architectural details lovingly preserved. Features include high ceilings, crown molding, hardwood floors, and a wraparound porch. Recently updated kitchen and bathrooms.',
    675000.00,
    '789 Elm Street, San Francisco, CA 94110',
    'sale',
    3,
    2,
    2100,
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    2
),
(
    'Contemporary Mountain Retreat',
    'Spectacular mountain retreat with stunning views. Open floor plan with vaulted ceilings, floor-to-ceiling windows, chef''s kitchen, and multiple decks. Minutes from skiing and hiking trails.',
    1200000.00,
    '321 Mountain View Road, Aspen, CO 81611',
    'sale',
    4,
    3,
    3200,
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    5
),
(
    'Urban Loft Conversion',
    'Unique loft space in converted historic warehouse. Exposed brick, polished concrete floors, industrial-style fixtures, and soaring ceilings. Includes dedicated parking and storage.',
    590000.00,
    '555 Industrial Way, Unit 12, Portland, OR 97209',
    'sale',
    1,
    1,
    1500,
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    5
),
(
    'Cozy Suburban Home',
    'Perfect family home in quiet suburban neighborhood. Features spacious backyard, modern kitchen, finished basement, and attached two-car garage. Great schools nearby and close to parks.',
    3200.00,
    '147 Oak Avenue, Arlington, VA 22201',
    'rent',
    3,
    2,
    1800,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    2
),
(
    'Waterfront Condo',
    'Beautiful waterfront condo with marina views. Updated kitchen and bathrooms, in-unit washer/dryer, balcony, and access to building amenities including pool, gym, and concierge.',
    2800.00,
    '999 Harbor Boulevard, Unit 807, Seattle, WA 98101',
    'rent',
    2,
    2,
    1300,
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    2
),
(
    'Studio in Trendy Neighborhood',
    'Bright studio apartment in vibrant neighborhood. Updated kitchen, hardwood floors, excellent closet space. Steps from cafes, boutiques, and nightlife. Pet-friendly building.',
    1800.00,
    '222 Hipster Lane, Apt 3C, Austin, TX 78701',
    'rent',
    1,
    1,
    650,
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    5
),
(
    'Spacious Family House',
    'Large family home with updated amenities. Open concept living/dining, renovated kitchen, master suite with walk-in closet, finished basement, and beautifully landscaped yard.',
    4500.00,
    '888 Maple Drive, Denver, CO 80203',
    'rent',
    4,
    3,
    2800,
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    5
),
(
    'Garden Apartment',
    'Ground floor apartment with private garden access. Recently renovated with new appliances, in-unit washer/dryer, and plenty of natural light. Quiet building in safe neighborhood.',
    2200.00,
    '333 Garden Court, Apt 1A, Boston, MA 02115',
    'rent',
    2,
    1,
    1100,
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    2
);
