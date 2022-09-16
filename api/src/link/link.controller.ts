import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { Link } from './entities/link.entity';
import { Order } from '../order/entities/order.entity';

@Controller()
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/ambassador/links')
  async create(@Body('products') products: number[], @Req() request: Request) {
    const user = await this.authService.user(request);
    return this.linkService.create({
      code: Math.random().toString(16).substring(6),
      user,
      products: products.map((id) => ({ id })),
    });
  }

  @UseGuards(AuthGuard)
  @Get('admin/users/:id/links')
  findAll(@Param('id') id: number) {
    return this.linkService.find({
      user: id,
      relations: ['orders'],
    });
  }

  @UseGuards(AuthGuard)
  @Get('ambassador/stats')
  async stats(@Req() request: Request) {
    const user = await this.authService.user(request);
    const links: Link[] = await this.linkService.find({
      user,
      relations: ['orders', 'orders.order_items'],
    });

    return links.map((link) => {
      const completedOrders: Order[] = link.orders.filter(
        (order) => order.complete,
      );

      return {
        code: link.code,
        count: link.orders,
        revenue: completedOrders.reduce(
          (acc, order) => acc + order.ambassador_revenue,
          0,
        ),
      };
    });
  }

  @Get('checkout/links/:code')
  async link(@Param('code') code: string) {
    return this.linkService.findOneByCode({
      code,
      relations: ['user', 'products'],
    });
  }
}
