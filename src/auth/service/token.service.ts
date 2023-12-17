import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import { TokenType } from '../enum/token.enum';
import {
    ACCESS_TOKEN_EXP,
    ACCESS_TOKEN_SECRET,
    ISS,
    REFRESH_TOKEN_EXP,
    REFRESH_TOKEN_SECRET,
} from '../constants/token.constant';

@Injectable()
export class TokenService {
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
            expiresIn: ACCESS_TOKEN_EXP,
            issuer: ISS,
            noTimestamp: true,
            secret: ACCESS_TOKEN_SECRET,
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
            expiresIn: REFRESH_TOKEN_EXP,
            issuer: ISS,
            noTimestamp: true,
            secret: REFRESH_TOKEN_SECRET,
        });
    }

    /**
     * verify token + check give heart user
     * @param token
     * @param type
     * @private
     */
    private async verifyToken(token: string, type: TokenType) {
        const decoded = this.jwtService.verify(token, {
            secret:
                type === TokenType.REFRESH_TOKEN
                    ? REFRESH_TOKEN_SECRET
                    : ACCESS_TOKEN_SECRET,
        });

        if (decoded.token_type !== type) {
            throw new Error('Invalid token');
        }

        if (decoded.iss !== ISS) {
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
