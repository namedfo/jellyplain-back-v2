import { Injectable } from '@nestjs/common';
import { query } from 'express';
//
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: any) {
    console.log(body);

    try {
      const order = await this.prisma.order.create({
        data: {
          totalPrice: body.totalPrice,
          delivery: body.delivery,
          status: body.status,
          // user: { connect: { id: 1 } },
          // address: { connect: { id: body.address.id } },
          productsOrder: {
            create: body.productsOrder,
          },
        },
        include: {
          productsOrder: true,
        },
      });
      return {
        id: order?.id,
      };
    } catch (error) {}
  }

  async get_one(id: number) {
    try {
      return await this.prisma.order.findUnique({
        where: {
          id,
        },
        include: {
          productsOrder: true,
        },
      });
    } catch (error) {}
  }
}
