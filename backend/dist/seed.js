"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const listing_entity_1 = require("./src/listings/entities/listing.entity");
const user_entity_1 = require("./src/entities/user.entity");
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'real_estate_db',
    entities: [listing_entity_1.Listing, user_entity_1.User],
    synchronize: true,
});
async function seed() {
    try {
        await dataSource.initialize();
        console.log('Data Source has been initialized!');
        const listingRepository = dataSource.getRepository(listing_entity_1.Listing);
        const count = await listingRepository.count();
        if (count > 0) {
            console.log('Database already seeded.');
            return;
        }
        const listings = [
            {
                title: 'Modern Downtown Apartment',
                description: 'A beautiful apartment in the heart of the city.',
                price: 450000,
                address: '123 Main St, Downtown',
                type: 'sale',
                bedrooms: 2,
                bathrooms: 2,
                sqft: 1200,
            },
            {
                title: 'Cozy Suburban Home',
                description: 'Perfect for a small family.',
                price: 3200,
                address: '456 Maple Ave, Suburbia',
                type: 'rent',
                bedrooms: 3,
                bathrooms: 2,
                sqft: 1800,
            },
            {
                title: 'Luxury Beachfront Villa',
                description: 'Stunning ocean views and private pool.',
                price: 2500000,
                address: '789 Ocean Dr, Beach City',
                type: 'sale',
                bedrooms: 5,
                bathrooms: 4,
                sqft: 4500,
            },
            {
                title: 'Urban Loft',
                description: 'Open concept living space with industrial vibes.',
                price: 2800,
                address: '101 Industrial Way, Arts District',
                type: 'rent',
                bedrooms: 1,
                bathrooms: 1,
                sqft: 950,
            },
            {
                title: 'Spacious Family House',
                description: 'Large backyard and close to schools.',
                price: 650000,
                address: '202 Oak Ln, Green Valley',
                type: 'sale',
                bedrooms: 4,
                bathrooms: 3,
                sqft: 2400,
            },
            {
                title: 'Modern Condo',
                description: 'Amenities include gym and rooftop terrace.',
                price: 350000,
                address: '303 High St, Metro City',
                type: 'sale',
                bedrooms: 2,
                bathrooms: 1,
                sqft: 1000,
            },
        ];
        for (const listingData of listings) {
            const listing = listingRepository.create(listingData);
            await listingRepository.save(listing);
        }
        console.log('Seeding complete!');
    }
    catch (err) {
        console.error('Error during seeding:', err);
    }
    finally {
        await dataSource.destroy();
    }
}
seed();
//# sourceMappingURL=seed.js.map