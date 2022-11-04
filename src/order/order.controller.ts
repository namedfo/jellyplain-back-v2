import { Body, Controller, Get, Post } from '@nestjs/common';
//
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('createOne')
  async create(@Body() dto: any) {
    return await this.orderService.create(dto);
  }

  @Get('getAll')
  async get_all(@Body() dto: any) {
    console.log('log');
    // return await this.orderService.create(dto);
  }
}
