import { Injectable } from '@nestjs/common';
//
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: any) {
    console.log(body);
    // if (body.isAddress) {
    // }

    const order = await this.prisma.order.create({
      data: {
        totalPrice: body.totalPrice,
        delivery: body.delivery,
        status: body.status,
        user: { connect: { id: 1 } },
        // address: { connect: { id: body.address.id } },
        productsOrder: {
          create: body.productsOrder,
        },
      },
      include: {
        productsOrder: true,
      },
    });
    return order;
  }
}
// "productsOrder": [
//   {
//     "size": "31",
//   "colors": ["he", "go"],
//   "price": 1000,
//   }
// ]
// totalPrice: 1000,
//   delivery: "pochtaru",
//   status: "pending",
