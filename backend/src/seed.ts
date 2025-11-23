import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ListingsService } from './listings/listings.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const listingsService = app.get(ListingsService);

    const listings = [
        {
            title: 'Modern Apartment in City Center',
            description: 'Beautiful 2 bedroom apartment with city views.',
            price: 250000,
            address: '123 Main St, Cityville',
            type: 'sale',
            bedrooms: 2,
            bathrooms: 2,
            sqft: 1200,
        },
        {
            title: 'Cozy Cottage',
            description: 'Charming cottage in the countryside.',
            price: 150000,
            address: '456 Country Rd, Ruraltown',
            type: 'sale',
            bedrooms: 3,
            bathrooms: 1,
            sqft: 1500,
        },
        {
            title: 'Luxury Villa',
            description: 'Stunning villa with pool and garden.',
            price: 1200000,
            address: '789 Ocean Dr, Beachcity',
            type: 'sale',
            bedrooms: 5,
            bathrooms: 4,
            sqft: 4000,
        },
        {
            title: 'Downtown Loft',
            description: 'Spacious loft in the heart of downtown.',
            price: 3000,
            address: '101 Urban Ave, Metropol',
            type: 'rent',
            bedrooms: 1,
            bathrooms: 1,
            sqft: 900,
        },
    ];

    for (const listing of listings) {
        await listingsService.create(listing);
        console.log(`Created listing: ${listing.title}`);
    }

    await app.close();
}

bootstrap();
