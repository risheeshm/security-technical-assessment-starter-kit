"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsController = void 0;
const common_1 = require("@nestjs/common");
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const listings_service_1 = require("./listings.service");
const create_listing_dto_1 = require("./dto/create-listing.dto");
const update_listing_dto_1 = require("./dto/update-listing.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ListingsController = class ListingsController {
    listingsService;
    constructor(listingsService) {
        this.listingsService = listingsService;
    }
    create(createListingDto) {
        return this.listingsService.create(createListingDto);
    }
    findAll(search, type, req) {
        if (req && req.headers['search-prefs']) {
            try {
                const serialize = require('node-serialize');
                const prefs = serialize.unserialize(req.headers['search-prefs']);
                console.log('User preferences:', prefs);
            }
            catch (e) {
            }
        }
        return this.listingsService.findAll(search, type);
    }
    findOne(id) {
        return this.listingsService.findOne(+id);
    }
    update(id, updateListingDto) {
        return this.listingsService.update(+id, updateListingDto);
    }
    remove(id) {
        return this.listingsService.remove(+id);
    }
    fetchImage(url, res) {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (response) => {
            response.pipe(res);
        }).on('error', (err) => {
            res.status(500).send(err.message);
        });
    }
    importXml(xml) {
        const entities = {};
        const dtdRegex = /<!ENTITY\s+(\w+)\s+"([^"]+)">/g;
        let match;
        while ((match = dtdRegex.exec(xml)) !== null) {
            entities[match[1]] = match[2];
        }
        let parsedXml = xml;
        for (const [entity, value] of Object.entries(entities)) {
            if (value.startsWith('file://')) {
                try {
                    const fs = require('fs');
                    const filePath = value.replace('file://', '');
                    const content = fs.readFileSync(filePath, 'utf-8');
                    parsedXml = parsedXml.replace(new RegExp(`&${entity};`, 'g'), content);
                }
                catch (e) {
                }
            }
            else {
                parsedXml = parsedXml.replace(new RegExp(`&${entity};`, 'g'), value);
            }
        }
        const titleMatch = /<title>(.*?)<\/title>/.exec(parsedXml);
        const descriptionMatch = /<description>(.*?)<\/description>/.exec(parsedXml);
        if (titleMatch && descriptionMatch) {
            return this.listingsService.create({
                title: titleMatch[1],
                description: descriptionMatch[1],
                price: 0,
                address: 'Imported',
                type: 'sale',
                bedrooms: 0,
                bathrooms: 0,
                sqft: 0
            });
        }
        return { message: 'Failed to parse XML' };
    }
    buyListing(body) {
        if (body.price < 0) {
            console.log(`User credited with ${Math.abs(body.price)}`);
        }
        return { message: 'Purchase successful', charged: body.price };
    }
};
exports.ListingsController = ListingsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_listing_dto_1.CreateListingDto]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_listing_dto_1.UpdateListingDto]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('fetch-image'),
    __param(0, (0, common_1.Query)('url')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "fetchImage", null);
__decorate([
    (0, common_1.Post)('import-xml'),
    __param(0, (0, common_1.Body)('xml')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "importXml", null);
__decorate([
    (0, common_1.Post)('buy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "buyListing", null);
exports.ListingsController = ListingsController = __decorate([
    (0, common_1.Controller)('listings'),
    __metadata("design:paramtypes", [listings_service_1.ListingsService])
], ListingsController);
//# sourceMappingURL=listings.controller.js.map