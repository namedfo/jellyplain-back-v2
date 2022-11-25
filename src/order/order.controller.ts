import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async create(@Body() body: any) {
    return await this.orderService.create(body);
  }

  @Get('getOne')
  async get_one(@Query() query: any) {
    return await this.orderService.get_one(Number(query?.id));
  }
}
