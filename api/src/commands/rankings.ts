import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

import { RedisService } from '../shared/redis.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);
  const ambassadors: User[] = await userService.find({
    is_ambassador: true,
    relations: ['orders', 'orders.order_items'],
  });
  const redisService = app.get(RedisService);
  const client = redisService.getClient();

  for (let index = 0; index < ambassadors.length; index++) {
    client.zadd(
      'rankings',
      ambassadors[index].revenue,
      ambassadors[index].name,
    );
  }
  process.exit();

  // application logic...
}
bootstrap();
