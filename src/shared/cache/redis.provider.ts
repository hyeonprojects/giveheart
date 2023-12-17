import { FactoryProvider } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

export const REDIS_PROVIDER = 'REDIS_PROVIDER';

export const redisProvider: FactoryProvider<Redis> = {
    inject: [ConfigService],
    provide: REDIS_PROVIDER,
    useFactory: async (configService: ConfigService) => {
        return new Redis(6379, configService.get<string>('REDIS_URL'));
    },
};
