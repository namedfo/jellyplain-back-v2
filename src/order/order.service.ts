import { Injectable } from '@nestjs/common';
//
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    const order = await this.prisma.order.create({
      data: {
        title: 'hi',
      },
    });

    return order;
  }
}
