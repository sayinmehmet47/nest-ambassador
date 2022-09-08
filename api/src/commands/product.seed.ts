import { ProductService } from './../product/product.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productService = app.get(ProductService);

  for (let index = 0; index < 35; index++) {
    await productService.create({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.business(),
      price: randomInt(10, 100),
    });
  }
  process.exit();

  // application logic...
}
bootstrap();
