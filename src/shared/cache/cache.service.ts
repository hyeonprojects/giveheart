import { Inject, Injectable } from '@nestjs/common';
import { REDIS_PROVIDER } from './redis.provider';
import Redis, { ChainableCommander } from 'ioredis';

@Injectable()
export class CacheService {
    constructor(@Inject(REDIS_PROVIDER) private readonly redis: Redis) {}

    async get(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        await this.redis.set(key, value);
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }

    async exists(key: string): Promise<boolean> {
        return (await this.redis.exists(key)) === 1;
    }

    async expire(key: string, seconds: number): Promise<void> {
        await this.redis.expire(key, seconds);
    }

    async ttl(key: string): Promise<number> {
        return this.redis.ttl(key);
    }

    pipeline(): ChainableCommander {
        return this.redis.pipeline();
    }
}
