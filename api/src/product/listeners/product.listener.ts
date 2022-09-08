import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductListener {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @OnEvent('product_updated')
  async handleProductUpdateEvent() {
    await this.cacheManager.del('product_frontend');
    await this.cacheManager.del('product_backend');
  }
}
