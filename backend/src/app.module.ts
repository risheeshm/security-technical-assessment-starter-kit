import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsModule } from './listings/listings.module';
import { Listing } from './listings/entities/listing.entity';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadController } from './upload/upload.controller';
import { RewardsModule } from './rewards/rewards.module';
import { DebugController } from './debug/debug.controller';
import { PreviewController } from './preview/preview.controller';
import { LogsController } from './logs/logs.controller';
import { AdminController } from './admin/admin.controller';
import { ProxyController } from './proxy/proxy.controller';
import { SystemController } from './admin/system.controller';
import { ShopController } from './shop/shop.controller';
import { GraphqlController } from './graphql/graphql.controller';
import { AnalyticsController } from './analytics/analytics.controller';
import { MobileController } from './mobile/mobile.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'real_estate_db',
      entities: [Listing, User],
      synchronize: true,
      // VULNERABILITY: Default DB Credentials (VULN-053)
      // Hardcoding default credentials in source code
      username: 'postgres',
      password: 'password',
    }),
    ListingsModule,
    AuthModule,
    UsersModule,
    RewardsModule,
  ],
  controllers: [AppController, UploadController, DebugController, PreviewController, LogsController, AdminController, ProxyController, SystemController, ShopController, GraphqlController, AnalyticsController, MobileController],
  providers: [AppService],
})
export class AppModule { }
