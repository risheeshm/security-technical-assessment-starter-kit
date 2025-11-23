import { IsString, Matches } from 'class-validator';

export class CreateUserDto {
    @IsString()
    // VULNERABILITY: ReDoS (VULN-023)
    // The regex is vulnerable to catastrophic backtracking
    // Pattern: ^([a-zA-Z0-9_]+)*@domain.com$
    // Attack: aaaaaaaaaaaaaaaaaaaaaaaa!
    @Matches(/^([a-zA-Z0-9_]+)*@domain.com$/, {
        message: 'Invalid email format',
    })
    email: string;
}
