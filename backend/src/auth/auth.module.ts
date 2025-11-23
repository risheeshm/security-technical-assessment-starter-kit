import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CsrfController } from './csrf.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'hardcoded_secret_key_123', // VULNERABILITY: Hardcoded secret
            signOptions: { expiresIn: '100y' }, // VULNERABILITY: Long expiration
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController, CsrfController],
    exports: [AuthService],
})
export class AuthModule { }
