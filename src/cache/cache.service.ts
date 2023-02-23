import { Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(private readonly cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async set(key: string, value: any, options?: { ttl: number }): Promise<void> {
    return this.cacheManager.set(key, value, options.ttl);
  }
}
