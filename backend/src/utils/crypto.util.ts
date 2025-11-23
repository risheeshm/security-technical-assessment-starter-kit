import * as crypto from 'crypto';

export class CryptoUtil {
    // VULNERABILITY: Weak Crypto (VULN-035)
    // Using AES-ECB mode which is insecure (patterns remain visible)
    static encrypt(text: string, key: string) {
        const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
}
