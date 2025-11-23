import { User } from '../../entities/user.entity';
export declare class Listing {
    id: number;
    title: string;
    description: string;
    price: number;
    address: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    imageUrl: string;
    owner: User;
}
