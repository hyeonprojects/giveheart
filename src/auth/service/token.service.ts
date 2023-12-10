import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { UsersService } from '../../users/service/users.service';
import { TokenType } from '../enum/token.enum';

@Injectable()
export class TokenService {
    private ISS = process.env.ISS;
    private ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP;
    private REFRESH_TOKEN_EXP = process.env.REFRESH_TOKEN_EXP;

    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) {}

    /**
     * create access token
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
     * create refresh token
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

    /**
     * verify token + check give heart user
     * @param token
     * @param type
     * @private
     */
    private async verifyToken(token: string, type: TokenType) {
        const decoded = this.jwtService.verify(token);

        if (decoded.token_type !== type) {
            throw new Error('Invalid token');
        }

        if (decoded.iss !== this.ISS) {
            throw new Error('Invalid token');
        }

        const user = await this.userService.findUserById(decoded.sub);
        if (!user) {
            throw new Error('Invalid token');
        }

        if (user.email !== decoded.aud) {
            throw new Error('Invalid token');
        }

        if (user.deletedAt) {
            throw new Error('Invalid token');
        }
        return decoded;
    }

    /**
     * verify access token
     * @param token
     */
    async verifyAccessToken(token: string) {
        return this.verifyToken(token, TokenType.ACCESS_TOKEN);
    }

    /**
     * verify refresh token
     * @param token
     */
    async verifyRefreshToken(token: string) {
        return this.verifyToken(token, TokenType.REFRESH_TOKEN);
    }
}
