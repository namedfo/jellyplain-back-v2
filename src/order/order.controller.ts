import { Body, Controller, Post } from '@nestjs/common';
//
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  async create(@Body() dto: any) {
    console.log('log')
    return await this.orderService.create(dto);
  }
}
