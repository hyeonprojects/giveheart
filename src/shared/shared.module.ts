import { Global, Module } from '@nestjs/common';
import { SharedService } from './service/shared.service';
import { CacheService } from './cache/cache.service';
import { redisProvider } from './cache/redis.provider';

@Global()
@Module({
    providers: [SharedService, CacheService, redisProvider],
    exports: [SharedService, CacheService],
})
export class SharedModule {}
