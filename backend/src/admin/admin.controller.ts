import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
    // VULNERABILITY: Missing Role Check (VULN-031)
    // Endpoint implies admin access but only checks for authentication, not authorization (role=admin)
    @UseGuards(JwtAuthGuard)
    @Get('users')
    getAllUsers() {
        return [
            { id: 1, email: 'admin@example.com', role: 'admin' },
            { id: 2, email: 'user@example.com', role: 'user' }
        ];
    }
}
