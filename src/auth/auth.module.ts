import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsersService } from '../users/service/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedService } from '../shared/service/shared.service';
import { TokenService } from './service/token.service';
import * as process from 'process';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SocialService } from './service/social.service';
import { HttpModule } from '@nestjs/axios';
import { SocialController } from './controller/social.controller';

@Module({
    imports: [
        UsersModule,
        PrismaModule,
        PassportModule,
        JwtModule.register({ secret: process.env.JWT_SECRET }),
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 3,
            }),
        }),
    ],
    controllers: [AuthController, SocialController],
    providers: [
        AuthService,
        SharedService,
        UsersService,
        TokenService,
        SocialService,
    ],
    exports: [AuthService, TokenService],
})
export class AuthModule {}
