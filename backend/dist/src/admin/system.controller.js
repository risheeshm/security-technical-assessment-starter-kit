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
exports.SystemController = void 0;
const common_1 = require("@nestjs/common");
let SystemController = class SystemController {
    getConfig(param) {
        if (Array.isArray(param)) {
            return { message: 'HPP Detected: Multiple parameters received', value: param };
        }
        return { message: 'Config param received', value: param };
    }
    getIp(req) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        return { ip, message: 'This IP is trusted based on headers' };
    }
};
exports.SystemController = SystemController;
__decorate([
    (0, common_1.Get)('config'),
    __param(0, (0, common_1.Query)('param')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Get)('ip'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "getIp", null);
exports.SystemController = SystemController = __decorate([
    (0, common_1.Controller)('system')
], SystemController);
//# sourceMappingURL=system.controller.js.map