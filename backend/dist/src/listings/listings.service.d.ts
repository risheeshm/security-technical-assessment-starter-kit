import { Repository } from 'typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
export declare class ListingsService {
    private listingsRepository;
    constructor(listingsRepository: Repository<Listing>);
    create(createListingDto: CreateListingDto): Promise<Listing>;
    findAll(search?: string, type?: string): Promise<Listing[]>;
    findOne(id: number): Promise<Listing | null>;
    update(id: number, updateListingDto: UpdateListingDto): Promise<Listing | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
