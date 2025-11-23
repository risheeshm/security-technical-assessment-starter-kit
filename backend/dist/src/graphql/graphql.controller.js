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
exports.GraphqlController = void 0;
const common_1 = require("@nestjs/common");
let GraphqlController = class GraphqlController {
    getSchema() {
        return {
            __schema: {
                types: [
                    { name: 'User', fields: [{ name: 'password' }, { name: 'email' }] }
                ]
            }
        };
    }
    query(query) {
        if (query && /^([a-z]+)+$/.test(query)) {
            return { data: 'Query processed' };
        }
        return { data: 'Invalid query' };
    }
};
exports.GraphqlController = GraphqlController;
__decorate([
    (0, common_1.Get)('schema'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GraphqlController.prototype, "getSchema", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('x-custom-query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GraphqlController.prototype, "query", null);
exports.GraphqlController = GraphqlController = __decorate([
    (0, common_1.Controller)('graphql')
], GraphqlController);
//# sourceMappingURL=graphql.controller.js.map