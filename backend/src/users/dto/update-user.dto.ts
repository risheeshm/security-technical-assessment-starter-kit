export class UpdateUserDto {
    email?: string;
    password?: string;
    // VULNERABILITY: Mass Assignment (VULN-032)
    // Allowing users to update their own role to 'admin'
    role?: string;
}
