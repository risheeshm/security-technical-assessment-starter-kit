import { Controller, Post, Get, Body, Req, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class CsrfController {
    // VULNERABILITY: CSRF (VULN-018)
    // This endpoint changes state (password) but:
    // 1. Accepts GET requests (via @Get handler alias or just poor design) - actually implementing as POST but without CSRF token check
    // 2. Does not verify any CSRF token
    // 3. Depends only on cookie authentication (which is automatically sent)

    @Post('change-password')
    async changePassword(@Body() body, @Req() req) {
        // In a real attack, the user would be authenticated via cookies.
        // Here we just simulate the action.
        console.log(`Changing password for user to ${body.newPassword}`);
        return { message: 'Password changed successfully' };
    }

    // Also allowing GET for easier exploitation (CSRF via image tag)
    @Get('change-password')
    async changePasswordGet(@Body() body, @Req() req) {
        console.log(`Changing password for user (via GET)`);
        return { message: 'Password changed successfully' };
    }
}
