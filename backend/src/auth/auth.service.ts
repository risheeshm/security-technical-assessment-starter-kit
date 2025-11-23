import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        // VULNERABILITY: Plaintext Password Storage (VULN-051)
        // Comparing plaintext passwords directly (downgrade from bcrypt)
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };
    }

    async register(user: any) {
        // VULNERABILITY: Plaintext Password Storage (VULN-051)
        // Storing passwords directly without hashing
        // const hashedPassword = await bcrypt.hash(user.password, 10);

        // VULNERABILITY: SQL Truncation (VULN-052)
        // Allowing extremely long inputs that might be truncated by the DB to match existing users (e.g. 'admin   ... ')
        // No length validation performed here.
        const newUser = await this.usersService.create({
            ...user,
            password: user.password, // Storing plaintext
        });
        const { password, ...result } = newUser;
        return result;
    }

    async generateResetToken(email: string) {
        // VULNERABILITY: Predictable Reset Token (VULN-030)
        // Using Math.random() which is not cryptographically secure
        const token = Math.floor(Math.random() * 100000).toString();
        return { token };
    }

    // VULNERABILITY: Weak Password Reset Question (VULN-066)
    // Security question is easily guessable
    async getSecurityQuestion(email: string) {
        return { question: "What is your pet's name?" };
    }

    // VULNERABILITY: Session Fixation (VULN-067)
    // Reusing session IDs (simulated here by returning a static session ID)
    async getSessionId() {
        return { sessionId: 'fixed_session_id_12345' };
    }

    // VULNERABILITY: JWT Key Confusion (VULN-065)
    // Simulating support for both HMAC and RSA but allowing confusion
    // (This is usually in the library or strategy config, but noting logic here)
    verifyToken(token: string) {
        // Insecure verification logic would go here
        return true;
    }
}
