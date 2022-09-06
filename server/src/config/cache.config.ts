import { CacheModuleOptions } from "@nestjs/common";
import * as redisStore from 'cache-manager-redis-store';

export const cacheConfig: CacheModuleOptions = {
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    isGlobal: true,
}