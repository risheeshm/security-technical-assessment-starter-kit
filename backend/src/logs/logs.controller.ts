import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('logs')
export class LogsController {
    // VULNERABILITY: Path Traversal (VULN-024)
    // Allows reading arbitrary files via ../ sequences
    @Get('view')
    viewLog(@Query('file') file: string, @Res() res: Response) {
        const logDir = './logs';
        // Vulnerable: No validation of 'file' parameter
        const filePath = path.join(logDir, file);

        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            res.send(content);
        } else {
            res.status(404).send('Log file not found');
        }
    }
}
