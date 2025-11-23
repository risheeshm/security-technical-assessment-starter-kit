import { Controller, Get, Query, Req } from '@nestjs/common';

@Controller('system')
export class SystemController {
    // VULNERABILITY: HTTP Parameter Pollution (HPP) (VULN-054)
    // If ?param=a&param=b is sent, Express might convert it to an array ['a', 'b']
    // or take the last one. Logic that expects a string might break or be bypassed.
    @Get('config')
    getConfig(@Query('param') param: any) {
        // Vulnerable logic: blindly assuming string but could be array
        if (Array.isArray(param)) {
            return { message: 'HPP Detected: Multiple parameters received', value: param };
        }
        return { message: 'Config param received', value: param };
    }

    // VULNERABILITY: IP Spoofing (VULN-055)
    // Trusting X-Forwarded-For header without verification
    @Get('ip')
    getIp(@Req() req) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        return { ip, message: 'This IP is trusted based on headers' };
    }
}
