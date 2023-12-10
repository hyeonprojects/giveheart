import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterPayload } from '../interface/auth.interface';
import { SharedService } from '../../shared/service/shared.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private sharedService: SharedService,
        private usersSerivce: UsersService,
        private jwtService: JwtService,
    ) {}

    /**
     * 회원가입 기능
     * @param signInPayload
     */
    async register(signInPayload: RegisterPayload) {
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

        return createdUser;
    }

    // async validateUser(email: string, password: string): Promise<any> {
    //     const user = await this.usersSerivce.findUserByEmail(email);
    //     if (user && user.password === password) {
    //         const { password, ...result } = user;
    //         return result;
    //     }
    // }
}
