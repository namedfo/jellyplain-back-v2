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
          yookassa: true
        },
      });
    } catch (error) {}
  }

  async buy(body: any) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: body?.order?.id,
      },
    });

    if (order) {
      return this.http
        .post(
          'https://api.yookassa.ru/v3/payments',
          {
            amount: {
              value: `${order?.totalPrice}.00`,
              currency: 'RUB',
            },
            capture: true,
            confirmation: {
              type: 'redirect',
              return_url: `https://jellyplain-main.vercel.app/order/${order?.id}`,
            },
            description: `${order?.id}`,
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
        .pipe(
          map(async (res: any) => {
            if (true) {
              await this.prisma.yookassa.create({
                data: {
                  yookassaId: res.data.id,
                  paid: res.data.paid,
                  account_id: res.data.recipient.account_id,
                  gateway_id: res.data.recipient.gateway_id,
                  order: { connect: { id: order?.id } },
                },
              });
              return res?.data?.confirmation?.confirmation_url
            }
          }),
        );
    }
  }
}
