import type { Response, Request } from 'express';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    create(createListingDto: CreateListingDto): Promise<import("./entities/listing.entity").Listing>;
    findAll(search?: string, type?: string, req?: Request): Promise<import("./entities/listing.entity").Listing[]>;
    findOne(id: string): Promise<import("./entities/listing.entity").Listing | null>;
    update(id: string, updateListingDto: UpdateListingDto): Promise<import("./entities/listing.entity").Listing | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    fetchImage(url: string, res: Response): void;
    importXml(xml: string): Promise<import("./entities/listing.entity").Listing> | {
        message: string;
    };
    buyListing(body: {
        id: number;
        price: number;
    }): {
        message: string;
        charged: number;
    };
}
