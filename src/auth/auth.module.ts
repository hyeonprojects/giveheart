import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import {UsersRepository} from "../users/repository/users.repository";

@Module({
    controllers: [AuthController],
    providers: [AuthService, UsersRepository],
    exports: [AuthService],
})
export class AuthModule {
}
