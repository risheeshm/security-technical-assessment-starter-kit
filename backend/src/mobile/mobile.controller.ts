import { Controller, Get, Post, Body, Query, Headers, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import { Public } from '../auth/decorators/public.decorator';

@Controller('mobile')
export class MobileController {
  
  // VULN-144: SSRF via image/media proxy
  @Get('fetch-media')
  async fetchMedia(@Query('url') url: string) {
    try {
      // VULN: No URL validation - can access internal resources
      // Attacker can use: http://169.254.169.254/latest/meta-data/
      // Or internal services: http://localhost:5432, http://database:5432
      
      const response = await axios.get(url, {
        timeout: 10000,
        // No egress rules
      });
      
      return {
        success: true,
        contentType: response.headers['content-type'],
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  // VULN-145: Deserialization in mobile admin endpoint
  @Post('admin/bulk-settings')
  async bulkSettings(@Body('settings') settingsData: string) {
    try {
      // VULN: Accepts serialized objects for "bulk operations"
      // In a real scenario, this would use node-serialize or similar
      // which has known gadget chains
      
      // Simulated unsafe deserialization
      const settings = JSON.parse(settingsData);
      
      // If this were actual node-serialize.unserialize(), it would be exploitable
      console.log('Applying bulk settings:', settings);
      
      return {
        success: true,
        message: 'Settings applied',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  // VULN-146: Mobile admin view with CSRF
  @Get('admin/dashboard')
  async adminDashboard(@Res() res: Response, @Headers('cookie') cookie: string) {
    // VULN: Loads admin interface in WebView without CSRF protection
    // Any malicious deep link can perform state-changing operations
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Mobile Admin</title>
      </head>
      <body>
        <h1>Admin Dashboard</h1>
        <form id="deleteForm" action="/mobile/admin/delete-user" method="POST">
          <input type="hidden" name="userId" id="userId" />
          <button onclick="deleteUser()">Delete User</button>
        </form>
        
        <script>
          // VULN: No CSRF token
          function deleteUser() {
            document.getElementById('userId').value = prompt('User ID:');
            document.getElementById('deleteForm').submit();
          }
          
          // Can be triggered via: realestate://webview?url=https://attacker.com/csrf.html
        </script>
      </body>
      </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }
  
  // VULN-147: JWT alg none acceptance on backend
  @Public()
  @Post('auth/verify-token')
  async verifyToken(@Body('token') token: string) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return { valid: false, error: 'Invalid token format' };
      }
      
      const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      
      // VULN: Accept tokens with alg: none
      if (header.alg === 'none') {
        console.warn('WARNING: Accepting token with alg=none');
        return {
          valid: true,
          payload,
          warning: 'Token signature not verified',
        };
      }
      
      // VULN-148: Weak claims validation
      const debugMode = process.env.DEBUG_MODE === 'true';
      if (debugMode) {
        // Skip expiration check in debug mode
        console.log('DEBUG: Skipping token expiration check');
        return { valid: true, payload };
      }
      
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
  
  // VULN-149: IDOR with offline caching
  @Get('user-data/:id')
  async getUserData(@Query('id') id: string) {
    // VULN: No ownership check - returns data for any user ID
    // Mobile app caches this which persists the vulnerability offline
    
    const userData = {
      id: id,
      email: `user${id}@example.com`,
      name: `User ${id}`,
      ssn: `XXX-XX-${id.padStart(4, '0')}`,  // Sensitive data
      creditCard: `**** **** **** ${id.padStart(4, '0')}`,
      address: '123 Main St',
      phone: `555-01${id.padStart(2, '0')}`,
    };
    
    // App will cache this in SQLite
    return {
      success: true,
      data: userData,
      cacheFor: 86400,  // Suggests 24-hour cache
    };
  }
  
  // VULN-150: Verbose error messages to mobile
  @Get('debug/error')
  async triggerError(@Query('type') errorType: string) {
    try {
      if (errorType === 'db') {
        throw new Error('Database connection failed: postgres://admin:password123@db:5432/realestatedb');
      } else if (errorType === 'api') {
        throw new Error('API Key invalid: sk_live_abc123xyz789');
      } else {
        throw new Error('Unknown error type');
      }
    } catch (error) {
      // VULN: Full stack trace and error details sent to mobile
      return {
        success: false,
        error: error.message,
        stack: error.stack,
        env: process.env,  // Exposes all environment variables!
      };
    }
  }
}
