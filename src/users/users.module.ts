import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { UsersRepository } from './repository/users.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
    exports: [UsersService, UsersRepository],
})
export class UsersModule {}
