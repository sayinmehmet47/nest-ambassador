import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  const password = bcrypt.hashSync('12345');

  for (let index = 0; index < 35; index++) {
    try {
      await userService.create({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: password,
        password_confirm: password,
        is_ambassador: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  process.exit();

  // application logic...
}
bootstrap();
