import { Injectable } from '@nestjs/common';
//
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { map } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { throws } from 'assert';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly authService: AuthService,
    private readonly http: HttpService,
  ) { }

  async create(body: any, userId: number) {
    try {
      const user: any = await this.prisma.user.findUnique({
        where: {
          id: userId
        }
      })
      if (user && user.address) {
        const order = await this.prisma.order.create({
          data: {
            totalPrice: body.totalPrice,
            delivery: body.delivery,
            status: body.status,
            user: { connect: { id: userId } },
            // address: { connect: { id: body.address.id } },
            productsOrder: {
              create: body.productsOrder,
            },
            yookassa: {
              create: {},
            },
            address: { connect: { id: user.address.id } },
          },
          include: {
            productsOrder: true,
          },
        });
        return {
          id: order?.id,
        };
      } else {
        const order = await this.prisma.order.create({
          data: {
            totalPrice: body.totalPrice,
            delivery: body.delivery,
            status: body.status,
            user: { connect: { id: userId } },
            // address: { connect: { id: body.address.id } },
            productsOrder: {
              create: body.productsOrder,
            },
            yookassa: {
              create: {},
            },
            address: {
              create: {
                user: { connect: { id: user.id } }
              }
            }
          },
          include: {
            productsOrder: true,
          },
        });
        return {
          id: order?.id,
        };
      }
    } catch (error) { }
  }

  async get_one(id: number, userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          orders: true,
        },
      });

      if (user?.orders?.some((order: any) => order?.id === id)) {
        const order = await this.prisma.order.findUnique({
          where: {
            id,
          },
          include: {
            productsOrder: {
              include: {
                product: true,
              },
            },
            yookassa: true,
          },
        });

        if (order?.yookassa?.yookassaId && order?.status === 'pending') {
          const res = await this.http.axiosRef.get(
            `https://api.yookassa.ru/v3/payments/${order?.yookassa?.yookassaId}`,
            {
              auth: {
                username: '959763',
                password: 'test_QBY07j0SMDgiGT-JMxF_0UZgNbFRtBFL53rwWs7ZhzQ',
              },
            },
          );

          if (res?.data?.status === 'succeeded') {
            return {
              order: await this.prisma.order.update({
                where: {
                  id: order?.id,
                },
                data: {
                  status: 'paid',
                  yookassa: {
                    update: {
                      paid: true,
                      payment_method: res.data?.payment_method?.type,
                    },
                  },
                },
                include: {
                  productsOrder: {
                    include: {
                      product: true,
                    },
                  },
                  yookassa: true,
                },
              }),
              confirmation_url: false,
            };
          } else {
            return {
              order,
              confirmation_url: res?.data?.confirmation?.confirmation_url,
            };
          }
        }

        return {
          order,
          confirmation_url: false,
        };
      } else {
        return {
          order: null,
          confirmation_url: false,
        };
      }
    } catch (error) { }
  }

  async buy(body: any) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: body?.order?.id,
      },
      include: {
        yookassa: true,
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
            if (!order?.yookassa?.yookassaId) {
              await this.prisma.yookassa.update({
                where: {
                  id: order.yookassa?.id,
                },
                data: {
                  yookassaId: res.data.id,
                  paid: res.data.paid,
                  account_id: res.data.recipient.account_id,
                  gateway_id: res.data.recipient.gateway_id,
                },
              });
            }
            return res?.data?.confirmation?.confirmation_url;
          }),
        );
    }
  }
}
