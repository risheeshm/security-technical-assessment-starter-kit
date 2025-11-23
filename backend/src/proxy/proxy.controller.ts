import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import * as http from 'http';

@Controller('proxy')
export class ProxyController {
    // VULNERABILITY: Unsafe External API (VULN-038)
    // No timeout configured, allowing DoS if the upstream is slow
    @Get()
    proxyRequest(@Query('url') url: string, @Res() res: Response) {
        http.get(url, (response) => {
            response.pipe(res);
        });
    }
}
