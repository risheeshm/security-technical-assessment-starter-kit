import { Controller, Get } from '@nestjs/common';

@Controller('debug')
export class DebugController {
    // VULNERABILITY: Information Disclosure (VULN-020)
    // Dumps all environment variables including secrets
    @Get('env')
    getEnv() {
        return process.env;
    }

    // VULNERABILITY: Information Disclosure (VULN-021)
    // Lists all available routes/endpoints
    @Get('routes')
    getRoutes() {
        return {
            routes: [
                '/auth/login',
                '/auth/register',
                '/auth/logout',
                '/auth/change-password',
                '/listings',
                '/users/settings',
                '/system/ping',
                '/debug/env',
                '/debug/routes'
            ]
        };
    }
}
