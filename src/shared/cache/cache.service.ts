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

    async flushall(): Promise<void> {
        await this.redis.flushall();
    }

    async flushdb(): Promise<void> {
        await this.redis.flushdb();
    }

    // sets
    async sadd(key: string, value: string): Promise<void> {
        await this.redis.sadd(key, value);
    }

    async srem(key: string, value: string): Promise<void> {
        await this.redis.srem(key, value);
    }

    async smembers(key: string): Promise<string[]> {
        return this.redis.smembers(key);
    }

    async sismember(key: string, value: string): Promise<boolean> {
        return (await this.redis.sismember(key, value)) === 1;
    }

    async scard(key: string): Promise<number> {
        return this.redis.scard(key);
    }

    async spop(key: string): Promise<string> {
        return this.redis.spop(key);
    }

    async srandmember(key: string): Promise<string> {
        return this.redis.srandmember(key);
    }

    async sinter(...keys: string[]): Promise<string[]> {
        return this.redis.sinter(...keys);
    }

    async sunion(...keys: string[]): Promise<string[]> {
        return this.redis.sunion(...keys);
    }

    async sdiff(...keys: string[]): Promise<string[]> {
        return this.redis.sdiff(...keys);
    }

    // lists
    async lpush(key: string, value: string): Promise<void> {
        await this.redis.lpush(key, value);
    }

    async rpush(key: string, value: string): Promise<void> {
        await this.redis.rpush(key, value);
    }

    async lpop(key: string): Promise<string> {
        return this.redis.lpop(key);
    }

    async rpop(key: string): Promise<string> {
        return this.redis.rpop(key);
    }

    async lrange(key: string, start: number, stop: number): Promise<string[]> {
        return this.redis.lrange(key, start, stop);
    }

    async lrem(key: string, count: number, value: string): Promise<number> {
        return this.redis.lrem(key, count, value);
    }

    async llen(key: string): Promise<number> {
        return this.redis.llen(key);
    }

    async lindex(key: string, index: number): Promise<string> {
        return this.redis.lindex(key, index);
    }

    async lset(key: string, index: number, value: string): Promise<void> {
        await this.redis.lset(key, index, value);
    }

    async ltrim(key: string, start: number, stop: number): Promise<void> {
        await this.redis.ltrim(key, start, stop);
    }

    // hashes
    async hset(key: string, field: string, value: string): Promise<void> {
        await this.redis.hset(key, field, value);
    }

    async hget(key: string, field: string): Promise<string> {
        return this.redis.hget(key, field);
    }

    async hdel(key: string, field: string): Promise<void> {
        await this.redis.hdel(key, field);
    }

    async hlen(key: string): Promise<number> {
        return this.redis.hlen(key);
    }

    async hkeys(key: string): Promise<string[]> {
        return this.redis.hkeys(key);
    }

    async hvals(key: string): Promise<string[]> {
        return this.redis.hvals(key);
    }

    async hgetall(key: string): Promise<{ [key: string]: string }> {
        return this.redis.hgetall(key);
    }

    async hexists(key: string, field: string): Promise<boolean> {
        return (await this.redis.hexists(key, field)) === 1;
    }

    async hincrby(
        key: string,
        field: string,
        increment: number,
    ): Promise<number> {
        return this.redis.hincrby(key, field, increment);
    }

    async hincrbyfloat(
        key: string,
        field: string,
        increment: number,
    ): Promise<number> {
        return this.redis.hincrbyfloat(key, field, increment);
    }

    // zsets
    async zadd(key: string, score: number, value: string): Promise<void> {
        await this.redis.zadd(key, score, value);
    }

    async zrem(key: string, value: string): Promise<void> {
        await this.redis.zrem(key, value);
    }

    async zrange(key: string, start: number, stop: number): Promise<string[]> {
        return this.redis.zrange(key, start, stop);
    }

    async zrevrange(
        key: string,
        start: number,
        stop: number,
    ): Promise<string[]> {
        return this.redis.zrevrange(key, start, stop);
    }

    async zrangebyscore(
        key: string,
        min: number,
        max: number,
    ): Promise<string[]> {
        return this.redis.zrangebyscore(key, min, max);
    }

    async zrevrangebyscore(
        key: string,
        max: number,
        min: number,
    ): Promise<string[]> {
        return this.redis.zrevrangebyscore(key, max, min);
    }

    async zrangebylex(
        key: string,
        min: string,
        max: string,
    ): Promise<string[]> {
        return this.redis.zrangebylex(key, min, max);
    }

    async zrevrangebylex(
        key: string,
        max: string,
        min: string,
    ): Promise<string[]> {
        return this.redis.zrevrangebylex(key, max, min);
    }

    async zremrangebylex(
        key: string,
        min: string,
        max: string,
    ): Promise<number> {
        return this.redis.zremrangebylex(key, min, max);
    }

    async zremrangebyrank(
        key: string,
        start: number,
        stop: number,
    ): Promise<number> {
        return this.redis.zremrangebyrank(key, start, stop);
    }

    async zremrangebyscore(
        key: string,
        min: number,
        max: number,
    ): Promise<number> {
        return this.redis.zremrangebyscore(key, min, max);
    }

    async zcard(key: string): Promise<number> {
        return this.redis.zcard(key);
    }

    async zcount(
        key: string,
        min: number | string,
        max: number | string,
    ): Promise<number> {
        return this.redis.zcount(key, min, max);
    }

    async zscore(key: string, value: string): Promise<number> {
        return this.redis.zscore(key, value);
    }

    async zrank(key: string, value: string): Promise<number> {
        return this.redis.zrank(key, value);
    }

    async zrevrank(key: string, value: string): Promise<number> {
        return this.redis.zrevrank(key, value);
    }

    async zlexcount(key: string, min: string, max: string): Promise<number> {
        return this.redis.zlexcount(key, min, max);
    }

    async zincrby(
        key: string,
        increment: number,
        value: string,
    ): Promise<number> {
        return this.redis.zincrby(key, increment, value);
    }

    async zunionstore(
        destination: string,
        numkeys: number,
        key: string,
        ...keys: string[]
    ): Promise<number> {
        return this.redis.zunionstore(destination, numkeys, key, ...keys);
    }

    async zinterstore(
        destination: string,
        numkeys: number,
        key: string,
        ...keys: string[]
    ): Promise<number> {
        return this.redis.zinterstore(destination, numkeys, key, ...keys);
    }

    async zscan(
        key: string,
        cursor: number,
        match?: string,
        count?: number,
    ): Promise<[string, string[]]> {
        return this.redis.zscan(key, cursor, match, count);
    }
}
