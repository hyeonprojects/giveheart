import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class TokenService {
    private ISS = process.env.ISS;
    private ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP;
    private REFRESH_TOKEN_EXP = process.env.REFRESH_TOKEN_EXP;

    constructor(private jwtService: JwtService) {}

    /**
     * access token
     * @param id
     * @param email
     */
    async createAccessToken(id: string, email: string) {
        const accessTokenPayload = { token_type: 'access_token' };
        return this.jwtService.sign(accessTokenPayload, {
            subject: id,
            audience: email,
            expiresIn: this.ACCESS_TOKEN_EXP,
            issuer: this.ISS,
            noTimestamp: true,
        });
    }

    /**
     * refresh token
     * @param id
     * @param email
     */
    async createRefreshToken(id: string, email: string) {
        const refreshTokenPayload = { token_type: 'refresh_token' };
        return this.jwtService.sign(refreshTokenPayload, {
            subject: id,
            audience: email,
            expiresIn: this.REFRESH_TOKEN_EXP,
            issuer: this.ISS,
            noTimestamp: true,
        });
    }

    async verifyToken(token: string) {
        // token 유저 인정
        return this.jwtService.verify(token);
    }
}
