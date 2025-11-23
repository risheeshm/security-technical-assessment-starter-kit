import { Controller, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { merge } from '../utils/merge.util';

@Controller('users')
export class UsersController {
    private userSettings = {}; // In-memory storage for demonstration

    @UseGuards(JwtAuthGuard)
    @Patch('settings')
    updateSettings(@Request() req, @Body() settings: any) {
        // VULNERABILITY: Prototype Pollution
        // The merge function recursively merges user input into an object
        // without sanitizing keys like __proto__, constructor, or prototype.
        const currentSettings = this.userSettings[req.user.id] || {};
        this.userSettings[req.user.id] = merge(currentSettings, settings);

        return {
            message: 'Settings updated',
            settings: this.userSettings[req.user.id]
        };
    }
}
