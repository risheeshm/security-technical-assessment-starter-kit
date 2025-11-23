import { Listing } from '../listings/entities/listing.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    listings: Listing[];
}
