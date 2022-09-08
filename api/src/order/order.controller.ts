import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductService } from './../product/product.service';
import { LinkService } from '../link/link.service';
import { AuthGuard } from './../auth/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Link } from '../link/entities/link.entity';
import { OrderItem } from './entities/orderItem.entity';
import { Product } from '../product/entities/product.entity';
import { DataSource } from 'typeorm';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
import { ConfigService } from '@nestjs/config';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private linkService: LinkService,
    private productService: ProductService,
    private dataSource: DataSource,
    @InjectStripe() private readonly stripeClient: Stripe,
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post('checkout/orders')
  async create(@Body() body: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const link: Link = await this.linkService.findOneByCode({
        code: body.code,
        relations: ['user'],
      });
      if (!link) {
        throw new BadRequestException('invalid links!');
      }

      let order = new Order();
      order.user_id = link.user.id;
      order.ambassador_email = link.user.email;
      order.code = body.code;
      order.first_name = body.first_name;
      order.last_name = body.last_name;
      order.email = body.email;
      order.address = body.address;
      order.country = body.country;
      order.city = body.city;
      order.zip = body.zip;

      order = await queryRunner.manager.save(order);

      const line_items = [];

      for (const p of body.products) {
        const product: Product = await this.productService.findOne({
          id: p.product_id,
        });

        const ambassador_revenue = Math.round(product.price * p.quantity * 0.1);
        const admin_revenue = Math.round(product.price * p.quantity * 0.9);

        const orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.product_title = product.title;
        orderItem.price = product.price;
        orderItem.quantity = p.quantity;
        orderItem.ambassador_revenue = ambassador_revenue;
        orderItem.admin_revenue = admin_revenue;

        await queryRunner.manager.save(orderItem);

        line_items.push({
          price_data: {
            unit_amount: 100 * product.price,
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.description,
              images: [product.image],
            },
          },
          quantity: p.quantity,
        });

        const source = await this.stripeClient.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items,
          success_url: `${this.configService.get(
            'CHECKOUT_URL',
          )}/success?source={CHECKOUT_SESSION_ID}`,
          cancel_url: `${this.configService.get('CHECKOUT_URL')}/api/error`,
        });

        order.transaction_id = source['id'];

        await queryRunner.manager.save(order);
        await queryRunner.commitTransaction();
        return source;
      }

      await queryRunner.manager.save(order);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('admin/orders')
  findAll() {
    return this.orderService.findAll({
      relations: ['order_items'],
    });
  }

  @Post('checkout/orders/confirm')
  async confirm(@Body('source') source: string) {
    const order = await this.orderService.findOneByTransactionId({
      transaction_id: source,
      relations: ['order_items', 'user'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderService.update(order.id, { complete: true });

    await this.eventEmitter.emit('order_completed', order);

    return {
      message: 'success',
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
