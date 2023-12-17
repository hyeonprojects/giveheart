import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class SharedService {
    private ALGORITHM = process.env.ALGORITHM;
    private IV = process.env.IV;
    private KEY = process.env.KEY;

    async encrypt(encryptText: string) {
        const key = Buffer.from(this.KEY, 'hex');
        const cipher = createCipheriv(this.ALGORITHM, key, this.IV);
        let encrypted = cipher.update(encryptText, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    async decrypt(decryptText: string) {
        const key = Buffer.from(this.KEY, 'hex');
        const decipher = createDecipheriv(this.ALGORITHM, key, this.IV);
        let decrypted = decipher.update(decryptText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    async encodeBase64(text: string) {
        return Buffer.from(text).toString('base64');
    }

    async decodeBase64(text: string) {
        return Buffer.from(text, 'base64').toString('utf-8');
    }
}
