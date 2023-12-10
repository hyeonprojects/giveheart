import { Global, Module } from '@nestjs/common';
import { SharedService } from './service/shared.service';

@Global()
@Module({
    providers: [SharedService],
    exports: [SharedService],
})
export class SharedModule {}
