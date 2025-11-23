import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rewards')
export class RewardsController {
    private claimedRewards = new Set<number>(); // In-memory storage

    @UseGuards(JwtAuthGuard)
    @Post('claim')
    async claimReward(@Request() req) {
        const userId = req.user.id;

        // VULNERABILITY: Race Condition
        // Checking state before action with a delay allowing parallel requests to bypass the check
        if (this.claimedRewards.has(userId)) {
            return { message: 'Reward already claimed' };
        }

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        this.claimedRewards.add(userId);
        return { message: 'Reward claimed successfully!', amount: 100 };
    }
}
