import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        UsersModule,
        SharedModule,
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
