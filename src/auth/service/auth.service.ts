import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { RegisterOutput, RegisterPayload } from '../interface/auth.interface';
import { SharedService } from '../../shared/service/shared.service';
import { User } from '@prisma/client';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(
        private sharedService: SharedService,
        private usersSerivce: UsersService,
        private tokenService: TokenService,
    ) {}

    /**
     * 회원가입 기능
     * @param signInPayload
     */
    async register(signInPayload: RegisterPayload): Promise<RegisterOutput> {
        signInPayload.password = await this.sharedService.decodeBase64(
            signInPayload.password,
        );

        const user = await this.usersSerivce.findUserByEmail(
            signInPayload.email,
        );
        if (user) {
            throw new UnauthorizedException('이미 가입된 이메일입니다.');
        }

        const encryptedPassword = await this.sharedService.encrypt(
            signInPayload.password,
        );

        const createdUser: User = await this.usersSerivce.createUser({
            ...signInPayload,
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

    async validateUser(id: string): Promise<any> {
        const user = await this.usersSerivce.findUserById(id);
        if (!user) {
            throw new UnauthorizedException('Not User Authenticated');
        }

        // 탈퇴 여부
        if (user.deletedAt) {
            throw new UnauthorizedException('Not User Authenticated');
        }
    }
}
