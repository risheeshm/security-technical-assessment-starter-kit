import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: any, res: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
        };
    }>;
    register(body: any): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
        listings: import("../listings/entities/listing.entity").Listing[];
    }>;
    logout(redirect: string, res: any): Promise<any>;
    forgotPassword(body: any, req: any): Promise<{
        message: string;
        link: string;
    }>;
}
