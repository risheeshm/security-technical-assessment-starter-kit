import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';
import { exec } from 'child_process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('system/ping')
  ping(@Query('host') host: string) {
    // VULNERABILITY: Command Injection
    // Executing shell command with user input
    return new Promise((resolve, reject) => {
      exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
        if (error) {
          resolve({ error: error.message, stderr });
        } else {
          resolve({ output: stdout });
        }
      });
    });
  }

  @Get('set-custom-header')
  setCustomHeader(@Query('value') value: string, @Res() res: Response) {
    // VULNERABILITY: HTTP Response Splitting (VULN-025)
    // Node.js protects against this in newer versions, but we simulate the intent.
    // If the underlying server allows CRLF in headers, this can lead to cache poisoning or XSS.
    res.setHeader('X-Custom-Header', value);
    res.send('Header set');
  }

  @Get('error')
  errorPage(@Query('msg') msg: string) {
    // VULNERABILITY: Reflected XSS (VULN-026)
    // Returning user input directly in HTML response
    return `<html><body><h1>Error</h1><p>${msg}</p></body></html>`;
  }
}
