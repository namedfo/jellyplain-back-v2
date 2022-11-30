import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt')) // ,RolesGuard
  @Post('create')
  async create(@Body() body: any, @Req() req: any) {
    return await this.orderService.create(body, req?.user?.id);
  }

  @Get('getOne')
  async get_one(@Query() query: any) {
    return await this.orderService.get_one(Number(query?.id));
  }

  @Post('buy')
  async buy(@Body() body: any) {
    return await this.orderService.buy(body);
  }
}
