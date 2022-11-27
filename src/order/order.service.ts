import { Injectable } from '@nestjs/common';
//
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { map } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

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
          productsOrder: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {}
  }

  async buy(body: any) {
    return this.http
      .post(
        'https://api.yookassa.ru/v3/payments',
        {
          amount: {
            value: `${body?.price}.00`,
            currency: 'RUB',
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: `http://localhost:3000/order/${body?.order?.id}`,
          },
          description: `${body?.order?.id}`,
        },
        {
          headers: {
            'Idempotence-Key': Math.ceil(Math.random() * 1000),
            'Content-Type': 'application/json',
          },
          auth: {
            username: '959763',
            password: 'test_QBY07j0SMDgiGT-JMxF_0UZgNbFRtBFL53rwWs7ZhzQ',
          },
        },
      )
      .pipe(map((res) => res.data));
  }
}
