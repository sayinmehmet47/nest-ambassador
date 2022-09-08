import { OrderItemService } from './../order/order-item.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';
import { OrderService } from '../order/order.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const orderService = app.get(OrderService);
  const orderItemService = app.get(OrderItemService);

  for (let index = 0; index < 35; index++) {
    const order = await orderService.create({
      user_id: randomInt(2, 31),
      code: faker.lorem.slug(2),
      ambassador_email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      complete: true,
      address: faker.address.street(),
      country: faker.address.country(),
      city: faker.address.city(),
      zip: faker.address.zipCode(),
    });

    for (let j = 0; j < randomInt(1, 5); j++) {
      await orderItemService.create({
        order,
        product_title: faker.commerce.productName(),
        price: randomInt(10, 100),
        quantity: randomInt(1, 5),
        admin_revenue: randomInt(10, 100),
        ambassador_revenue: randomInt(1, 10),
      });
    }
  }
  process.exit();

  // application logic...
}
bootstrap();
