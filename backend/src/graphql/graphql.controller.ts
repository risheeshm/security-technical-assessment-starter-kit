import { Controller, Post, Body, Headers, Get } from '@nestjs/common';

@Controller('graphql')
export class GraphqlController {
    // VULNERABILITY: GraphQL Introspection (VULN-071)
    // Simulating an enabled introspection endpoint
    @Get('schema')
    getSchema() {
        return {
            __schema: {
                types: [
                    { name: 'User', fields: [{ name: 'password' }, { name: 'email' }] }
                ]
            }
        };
    }

    // VULNERABILITY: Regex Denial of Service (ReDoS) (VULN-070)
    // Vulnerable regex in header parsing
    @Post()
    query(@Headers('x-custom-query') query: string) {
        if (query && /^([a-z]+)+$/.test(query)) { // Evil regex
            return { data: 'Query processed' };
        }
        return { data: 'Invalid query' };
    }
}
