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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const public_decorator_1 = require("../auth/decorators/public.decorator");
let MobileController = class MobileController {
    async fetchMedia(url) {
        try {
            const response = await axios_1.default.get(url, {
                timeout: 10000,
            });
            return {
                success: true,
                contentType: response.headers['content-type'],
                data: response.data,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
    async bulkSettings(settingsData) {
        try {
            const settings = JSON.parse(settingsData);
            console.log('Applying bulk settings:', settings);
            return {
                success: true,
                message: 'Settings applied',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
    async adminDashboard(res, cookie) {
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Mobile Admin</title>
      </head>
      <body>
        <h1>Admin Dashboard</h1>
        <form id="deleteForm" action="/mobile/admin/delete-user" method="POST">
          <input type="hidden" name="userId" id="userId" />
          <button onclick="deleteUser()">Delete User</button>
        </form>
        
        <script>
          // VULN: No CSRF token
          function deleteUser() {
            document.getElementById('userId').value = prompt('User ID:');
            document.getElementById('deleteForm').submit();
          }
          
          // Can be triggered via: realestate://webview?url=https://attacker.com/csrf.html
        </script>
      </body>
      </html>
    `;
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    }
    async verifyToken(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                return { valid: false, error: 'Invalid token format' };
            }
            const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
            const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
            if (header.alg === 'none') {
                console.warn('WARNING: Accepting token with alg=none');
                return {
                    valid: true,
                    payload,
                    warning: 'Token signature not verified',
                };
            }
            const debugMode = process.env.DEBUG_MODE === 'true';
            if (debugMode) {
                console.log('DEBUG: Skipping token expiration check');
                return { valid: true, payload };
            }
            return { valid: true, payload };
        }
        catch (error) {
            return { valid: false, error: error.message };
        }
    }
    async getUserData(id) {
        const userData = {
            id: id,
            email: `user${id}@example.com`,
            name: `User ${id}`,
            ssn: `XXX-XX-${id.padStart(4, '0')}`,
            creditCard: `**** **** **** ${id.padStart(4, '0')}`,
            address: '123 Main St',
            phone: `555-01${id.padStart(2, '0')}`,
        };
        return {
            success: true,
            data: userData,
            cacheFor: 86400,
        };
    }
    async triggerError(errorType) {
        try {
            if (errorType === 'db') {
                throw new Error('Database connection failed: postgres://admin:password123@db:5432/realestatedb');
            }
            else if (errorType === 'api') {
                throw new Error('API Key invalid: sk_live_abc123xyz789');
            }
            else {
                throw new Error('Unknown error type');
            }
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                stack: error.stack,
                env: process.env,
            };
        }
    }
};
exports.MobileController = MobileController;
__decorate([
    (0, common_1.Get)('fetch-media'),
    __param(0, (0, common_1.Query)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MobileController.prototype, "fetchMedia", null);
__decorate([
    (0, common_1.Post)('admin/bulk-settings'),
    __param(0, (0, common_1.Body)('settings')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MobileController.prototype, "bulkSettings", null);
__decorate([
    (0, common_1.Get)('admin/dashboard'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MobileController.prototype, "adminDashboard", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('auth/verify-token'),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MobileController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Get)('user-data/:id'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MobileController.prototype, "getUserData", null);
__decorate([
    (0, common_1.Get)('debug/error'),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MobileController.prototype, "triggerError", null);
exports.MobileController = MobileController = __decorate([
    (0, common_1.Controller)('mobile')
], MobileController);
//# sourceMappingURL=mobile.controller.js.map