import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true, // VULNERABILITY: Missing Claims Check (VULN-029) - Tokens never expire
            secretOrKey: 'hardcoded_secret_key_123', // VULNERABILITY: Hardcoded secret (VULN-004)
            algorithms: ['HS256', 'none'], // VULNERABILITY: JWT None Algorithm (VULN-028) - Allowing 'none' alg
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}
