import { Injectable } from '@nestjs/common';
//
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: any) {
    if (body.isAddress) {
    }

    const order = await this.prisma.order.create({
      data: {
        totalPrice: body.totalPrice,
        delivery: body.delivery,
        status: body.status,
        address: { connect: { id: body.address.id } },
      },
    });
    return order;
  }
}
