import {Module} from '@nestjs/common';
import {UsersService} from './service/users.service';
import {UsersController} from './controller/users.controller';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
