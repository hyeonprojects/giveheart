import {Module} from '@nestjs/common';
import {AuthController} from './controller/auth.controller';
import {AuthService} from './service/auth.service';
import {UsersService} from '../users/service/users.service';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        UsersService,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '15m',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {
}
