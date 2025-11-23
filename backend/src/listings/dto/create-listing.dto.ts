export class CreateListingDto {
    title: string;
    description: string;
    price: number;
    address: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    imageUrl?: string;
    // VULNERABILITY: Mass Assignment
    // Allowing users to specify the ownerId directly
    ownerId?: number;
}
