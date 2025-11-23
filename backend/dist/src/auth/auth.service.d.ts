import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
        };
    }>;
    register(user: any): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
        listings: import("../listings/entities/listing.entity").Listing[];
    }>;
    generateResetToken(email: string): Promise<{
        token: string;
    }>;
    getSecurityQuestion(email: string): Promise<{
        question: string;
    }>;
    getSessionId(): Promise<{
        sessionId: string;
    }>;
    verifyToken(token: string): boolean;
}
