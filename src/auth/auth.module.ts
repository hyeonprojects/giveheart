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

@Module({
    imports: [
        UsersModule,
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, SharedService, UsersService, TokenService],
    exports: [AuthService, TokenService],
})
export class AuthModule {}
