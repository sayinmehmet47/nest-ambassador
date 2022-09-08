import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  CacheKey,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
  CACHE_MANAGER,
  Inject,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Cache } from 'cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Product } from './entities/product.entity';

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/admin/products')
  create(@Body() createProductDto: CreateProductDto) {
    this.eventEmitter.emit('product_updated');

    return this.productService.create(createProductDto);
  }

  @UseGuards(AuthGuard)
  @Get('/admin/products')
  findAll() {
    return this.productService.find({});
  }

  @UseGuards(AuthGuard)
  @Get('/admin/products/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put('/admin/products/:id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productService.update(id, updateProductDto);
    this.eventEmitter.emit('product_updated');

    return this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Delete('/admin/products/:id')
  async remove(@Param('id') id: number) {
    await this.productService.remove(id);
    this.eventEmitter.emit('product_updated');
    return `successfully removed ${id}`; //
  }

  @CacheKey('products.frontend')
  @CacheTTL(30 * 60)
  @UseInterceptors(CacheInterceptor)
  @Get('ambassador/products/frontend')
  async frontend() {
    return this.productService.find({});
  }

  @Get('ambassador/products/backend')
  async backend(
    @Query('search') search: string,
    @Query('sort') sort: string,
    @Query('page') page = 1,
  ) {
    let products = await this.cacheManager.get<Product[]>('product_backend');

    if (!products) {
      products = await this.productService.find({});
      await this.cacheManager.set('product_backend', products);
    }

    if (search) {
      const searchToLowerCase = search.toLowerCase();
      products = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchToLowerCase) ||
          product.description.toLowerCase().includes(searchToLowerCase),
      ); //
    }

    if (sort) {
      if (sort === 'desc') {
        products = products.sort((a, b) => b.price - a.price);
      } else if (sort === 'asc') {
        products = products.sort((a, b) => a.price - b.price);
      }
    }

    //pagination
    const perPage = 9;
    const data = products.slice((page - 1) * perPage, page * perPage);
    const total = products.length;
    const last_page = Math.ceil(total / perPage);
    return {
      data,
      total,
      page,
      last_page,
    };
  }
}
