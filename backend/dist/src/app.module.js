"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const listings_module_1 = require("./listings/listings.module");
const listing_entity_1 = require("./listings/entities/listing.entity");
const user_entity_1 = require("./entities/user.entity");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const upload_controller_1 = require("./upload/upload.controller");
const rewards_module_1 = require("./rewards/rewards.module");
const debug_controller_1 = require("./debug/debug.controller");
const preview_controller_1 = require("./preview/preview.controller");
const logs_controller_1 = require("./logs/logs.controller");
const admin_controller_1 = require("./admin/admin.controller");
const proxy_controller_1 = require("./proxy/proxy.controller");
const system_controller_1 = require("./admin/system.controller");
const shop_controller_1 = require("./shop/shop.controller");
const graphql_controller_1 = require("./graphql/graphql.controller");
const analytics_controller_1 = require("./analytics/analytics.controller");
const mobile_controller_1 = require("./mobile/mobile.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432'),
                database: process.env.DB_NAME || 'real_estate_db',
                entities: [listing_entity_1.Listing, user_entity_1.User],
                synchronize: true,
                username: 'postgres',
                password: 'password',
            }),
            listings_module_1.ListingsModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            rewards_module_1.RewardsModule,
        ],
        controllers: [app_controller_1.AppController, upload_controller_1.UploadController, debug_controller_1.DebugController, preview_controller_1.PreviewController, logs_controller_1.LogsController, admin_controller_1.AdminController, proxy_controller_1.ProxyController, system_controller_1.SystemController, shop_controller_1.ShopController, graphql_controller_1.GraphqlController, analytics_controller_1.AnalyticsController, mobile_controller_1.MobileController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map