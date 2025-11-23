"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const listing_entity_1 = require("./entities/listing.entity");
let ListingsService = class ListingsService {
    listingsRepository;
    constructor(listingsRepository) {
        this.listingsRepository = listingsRepository;
    }
    create(createListingDto) {
        const listing = this.listingsRepository.create(createListingDto);
        return this.listingsRepository.save(listing);
    }
    async findAll(search, type) {
        let query = 'SELECT * FROM listing WHERE 1=1';
        if (search) {
            query += ` AND (title ILIKE '%${search}%' OR description ILIKE '%${search}%' OR address ILIKE '%${search}%')`;
        }
        if (type) {
            query += ` AND type ILIKE '%${type}%'`;
        }
        return this.listingsRepository.query(query);
    }
    findOne(id) {
        return this.listingsRepository.findOneBy({ id });
    }
    async update(id, updateListingDto) {
        await this.listingsRepository.update(id, updateListingDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.listingsRepository.delete(id);
        return { deleted: true };
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(listing_entity_1.Listing)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ListingsService);
//# sourceMappingURL=listings.service.js.map