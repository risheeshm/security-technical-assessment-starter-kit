import { Controller, Post, Body, UnauthorizedException, Get, Query, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body, @Res({ passthrough: true }) res) {
        const user = await this.authService.validateUser(body.email, body.password);

        // VULNERABILITY: Timing Attack (VULN-069)
        // If user exists, we do more work (validateUser does DB lookup + comparison).
        // If user doesn't exist, we return immediately (or faster).
        // Attackers can measure this time difference to enumerate users.
        // (Simulating extra delay for valid users to make it obvious)
        if (user) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (!user) {
            // VULNERABILITY: User Enumeration (VULN-047)
            // Returning specific error messages allows attackers to guess valid emails
            throw new UnauthorizedException('User not found');
        }
        const token = await this.authService.login(user);

        // VULNERABILITY: Insecure Cookies (VULN-041, VULN-042, VULN-043)
        // Missing HttpOnly, Secure, and SameSite attributes
        res.cookie('auth_token', token.access_token, {
            httpOnly: false, // VULN-041
            secure: false,   // VULN-042
            sameSite: 'lax'  // VULN-043 (Should be Strict or None+Secure)
        });

        return token;
    }

    @Post('register')
    async register(@Body() body) {
        return this.authService.register(body);
    }

    @Get('logout')
    async logout(@Query('redirect') redirect: string, @Res() res) {
        // VULNERABILITY: Open Redirect (VULN-019)
        // Redirecting to arbitrary URL provided by user
        if (redirect) {
            return res.redirect(redirect);
        }
        return res.redirect('/');
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body, @Req() req) {
        // VULNERABILITY: Host Header Injection (VULN-034)
        // Using the Host header to construct the reset link without validation
        const host = req.headers.host;
        const resetLink = `http://${host}/reset-password?token=123`;
        return { message: 'Reset link sent', link: resetLink };
    }
}
