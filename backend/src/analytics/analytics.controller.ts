import { Controller, Get, Query } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
    // VULNERABILITY: IDOR (VULN-072)
    // Accessing analytics data by ID without ownership check
    @Get('view')
    viewAnalytics(@Query('id') id: string) {
        return {
            id,
            visits: Math.floor(Math.random() * 1000),
            revenue: Math.floor(Math.random() * 5000)
        };
    }
}
