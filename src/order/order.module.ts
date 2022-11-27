import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [HttpModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
