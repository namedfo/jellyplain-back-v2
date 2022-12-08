import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private http: HttpService,
  ) {}

  // async authicate() {}
  async validateUser(payload: any) {
    return await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        address: true,
        orders: {
          include: {
            yookassa: true,
            address: true,
          },
        },
      },
    });
  }

  async findUser(token: string) {
    const payload: any = this.jwtService.decode(token);
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        address: true,
        orders: {
          include: {
            yookassa: true,
            address: true,
            productsOrder: true,
          },
        },
      },
    });

    return {
      id: user.id,
      createdAt: user.createdAt,
      first_name: user.first_name,
      orders: user.orders,
      address: user.address,
      phone_number: user.phone_number,
      last_name: user.last_name,
      avatar_url: user.avatar_url,
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async vkontakte(user: any) {
    try {
      const userUpsert = await this.prisma.user.upsert({
        where: {
          cusId: String(user.id),
        },
        update: {
          first_name: user?.name?.givenName,
          last_name: user?.name?.familyName,
          avatar_url: user?.photos[0]?.value,
        },
        create: {
          cusId: String(user.id),
          first_name: user?.name?.givenName,
          last_name: user?.name?.familyName,
          avatar_url: user?.photos[0]?.value,
        },
      });
      return this.jwtService.sign({ id: userUpsert.id });
    } catch (error) {}
  }

  async google(user: any) {
    try {
      const userUpsert = await this.prisma.user.upsert({
        where: {
          cusId: user.email,
        },
        update: {
          first_name: user.firstName,
          last_name: user.lastName,
          avatar_url: user.picture,
        },
        create: {
          cusId: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          avatar_url: user.picture,
        },
      });
      return this.jwtService.sign({ id: userUpsert.id });
    } catch (error) {}
  }
}
