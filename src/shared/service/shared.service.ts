import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class SharedService {
    private SALT = process.env.SALT;
    private ALGORITHM = 'aes-256-gcm';
    private IV = process.env.IV;
    private KEY = process.env.KEY;

    constructor() {}

    async encrypt(encryptText: string) {
        const cipher = createCipheriv(this.ALGORITHM, this.KEY, this.IV);
        let encrypted = cipher.update(encryptText, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    async decrypt(decryptText: string) {
        const decipher = createDecipheriv(this.ALGORITHM, this.KEY, this.IV);
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
