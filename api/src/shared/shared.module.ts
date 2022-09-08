import { RedisService } from './redis.service';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
  ],
  providers: [RedisService],

  exports: [JwtModule, CacheModule, RedisService],
})
export class SharedModule {}
