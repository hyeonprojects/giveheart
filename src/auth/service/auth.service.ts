import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor() {}

    async signIn(email: string, password: string) {
        return { email, password };
    }
}
