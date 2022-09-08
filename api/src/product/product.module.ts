import { SharedModule } from './../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { ProductListener } from './listeners/product.listener';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductListener],
  imports: [TypeOrmModule.forFeature([Product]), SharedModule],
  exports: [ProductService],
})
export class ProductModule {}
