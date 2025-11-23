import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
  ) { }

  create(createListingDto: CreateListingDto) {
    const listing = this.listingsRepository.create(createListingDto);
    return this.listingsRepository.save(listing);
  }

  async findAll(search?: string, type?: string): Promise<Listing[]> {
    // VULNERABILITY: SQL Injection
    // Directly concatenating user input into the query string
    let query = 'SELECT * FROM listing WHERE 1=1';

    if (search) {
      query += ` AND (title ILIKE '%${search}%' OR description ILIKE '%${search}%' OR address ILIKE '%${search}%')`;
    }

    if (type) {
      query += ` AND type ILIKE '%${type}%'`;
    }

    return this.listingsRepository.query(query);
  }

  findOne(id: number) {
    return this.listingsRepository.findOneBy({ id });
  }

  async update(id: number, updateListingDto: UpdateListingDto) {
    await this.listingsRepository.update(id, updateListingDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.listingsRepository.delete(id);
    return { deleted: true };
  }
}
