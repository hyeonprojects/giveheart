import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import {
    AuthOutput,
    LoginPayload,
    RegisterPayload,
} from '../interface/auth.interface';
import { SharedService } from '../../shared/service/shared.service';
import { User } from '@prisma/client';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(
        private sharedService: SharedService,
        private usersService: UsersService,
        private tokenService: TokenService,
    ) {}

    /**
     * 회원가입 기능
     * @param payload
     */
    async register(payload: RegisterPayload): Promise<AuthOutput> {
        payload.password = await this.sharedService.decodeBase64(
            payload.password,
        );

        const user = await this.usersService.findUserByEmail(payload.email);
        if (user) {
            throw new UnauthorizedException('이미 가입된 이메일입니다.');
        }

        const encryptedPassword = await this.sharedService.encrypt(
            payload.password,
        );

        const createdUser: User = await this.usersService.createUser({
            ...payload,
            password: encryptedPassword,
        });

        // token 발행
        const accessToken = await this.tokenService.createAccessToken(
            createdUser.id,
            createdUser.email,
        );

        const refreshToken = await this.tokenService.createRefreshToken(
            createdUser.id,
            createdUser.email,
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    /**
     * login
     * @param payload
     */
    async login(payload: LoginPayload): Promise<AuthOutput> {
        const user = await this.usersService.findUserByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException('Not User Authenticated');
        }

        // 탈퇴 여부
        if (user.deletedAt) {
            throw new UnauthorizedException('Not User Authenticated');
        }

        // 비밀번호 체크
        payload.password = await this.sharedService.decodeBase64(
            payload.password,
        );

        const encryptedPassword = await this.sharedService.encrypt(
            payload.password,
        );
        if (encryptedPassword !== user.password) {
            throw new UnauthorizedException('Not User Authenticated');
        }

        // token 발행
        const accessToken = await this.tokenService.createAccessToken(
            user.id,
            user.email,
        );

        const refreshToken = await this.tokenService.createRefreshToken(
            user.id,
            user.email,
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    /**
     * Token Refresh
     * @param token
     */
    async tokenRefresh(token: string): Promise<AuthOutput> {
        // todo: refresh token 캐쉬
        const decoded = await this.tokenService.verifyRefreshToken(token);

        const accessToken = await this.tokenService.createAccessToken(
            decoded.sub,
            decoded.email,
        );

        const refreshToken = await this.tokenService.createRefreshToken(
            decoded.sub,
            decoded.email,
        );

        return {
            accessToken,
            refreshToken,
        };
    }
}
