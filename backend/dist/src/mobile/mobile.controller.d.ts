import { Response } from 'express';
export declare class MobileController {
    fetchMedia(url: string): Promise<{
        success: boolean;
        contentType: any;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        contentType?: undefined;
        data?: undefined;
    }>;
    bulkSettings(settingsData: string): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    adminDashboard(res: Response, cookie: string): Promise<void>;
    verifyToken(token: string): Promise<{
        valid: boolean;
        payload: any;
        warning: string;
        error?: undefined;
    } | {
        valid: boolean;
        payload: any;
        warning?: undefined;
        error?: undefined;
    } | {
        valid: boolean;
        error: any;
        payload?: undefined;
        warning?: undefined;
    }>;
    getUserData(id: string): Promise<{
        success: boolean;
        data: {
            id: string;
            email: string;
            name: string;
            ssn: string;
            creditCard: string;
            address: string;
            phone: string;
        };
        cacheFor: number;
    }>;
    triggerError(errorType: string): Promise<{
        success: boolean;
        error: any;
        stack: any;
        env: NodeJS.ProcessEnv;
    }>;
}
