import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../../users/service/users.service";
import {JwtService} from "@nestjs/jwt";
import {TokenInterface} from "../interface/token.interface";
import * as process from "process";
import {SingInPayload} from "../interface/auth.interface";

@Injectable()
export class AuthService {
    constructor(private usersSerivce: UsersService, private jwtService: JwtService) {}

    async signIn(signInPayload: SingInPayload) {
        const user = await this.usersSerivce.findUserByEmail(email);
        if (signInPayload.password !== user?.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

    }
}
