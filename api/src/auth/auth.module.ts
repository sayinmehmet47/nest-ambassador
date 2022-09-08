import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, SharedModule],
  exports: [AuthService],
})
export class AuthModule {}
