import { Controller, Post, Body } from '@nestjs/common';

@Controller('preview')
export class PreviewController {
    // VULNERABILITY: Server-Side Template Injection (SSTI) (VULN-022)
    // Simulating a template engine that evaluates user input
    @Post('email')
    previewEmail(@Body('template') template: string) {
        // In a real scenario, this would be a template engine like Handlebars, Pug, or EJS
        // improperly configured or used. Here we simulate it with eval() for demonstration.
        // Attack: {{ process.env }} or similar if it was a real engine, here JS code works.
        try {
            // DANGEROUS: Simulating template evaluation
            const result = eval('`' + template + '`');
            return { preview: result };
        } catch (e) {
            return { error: e.message };
        }
    }
}
