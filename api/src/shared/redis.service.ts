import { RedisClient } from 'redis';
import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  getClient(): RedisClient {
    const store: any = this.cacheManager.store;
    return store.getClient();
  }
}
