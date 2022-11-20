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
        orders: true,
      },
    });

    return {
      id: user.id,
      createdAt: user.createdAt,
      first_name: user.first_name,
      orders: user.orders,
      address: user.address,
      last_name: user.last_name,
      avatar_url: user.avatar_url,
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async vk(code: string) {
    const getTokenAndUserId = await this.getVkToken(code);

    const vkUserData: any = await this.getUserDataFromVk(
      getTokenAndUserId.user_id,
      getTokenAndUserId.access_token,
    );

    const _user = await this.prisma.user.findUnique({
      where: {
        vkID: vkUserData?.id,
      },
      include: {
        orders: true,
        address: true,
      },
    });

    if (_user) {
      return {
        id: _user.id,
        orders: _user.orders,
        address: _user.address,
        createdAt: _user.createdAt,
        first_name: _user.first_name,
        last_name: _user.last_name,
        avatar_url: _user.avatar_url,
        token: this.jwtService.sign({ id: _user.id }),
      };
    }

    if (vkUserData.id && !_user) {
      const newUser = await this.prisma.user.create({
        data: {
          vkID: vkUserData.id,
          first_name: vkUserData.first_name,
          last_name: vkUserData.last_name,
          avatar_url: vkUserData.image,
          bdate: vkUserData.bdate,
        },
        include: {
          orders: true,
          address: true,
        },
      });
      return {
        id: newUser.id,
        orders: newUser.orders,
        address: newUser.address,
        createdAt: newUser.createdAt,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        avatar_url: newUser.avatar_url,
        token: this.jwtService.sign({ id: newUser.id }),
      };
    }
  }

  async getVkToken(code: string) {
    const token: any = await this.http.axiosRef.get(
      `https://oauth.vk.com/access_token?client_id=51473574&client_secret=eyukYXPWuEzwSvYkKM5x&redirect_uri=https://jellyplain-main.vercel.app/redirect&code=${code}`,
    );

    return token?.data;
  }

  async getUserDataFromVk(userId: number, token: string) {
    const data: any = await this.http.axiosRef.get(
      `https://api.vk.com/method/users.get?user_ids=${userId}&fields=photo_200,bdate&access_token=${token}&v=5.131`,
    );

    // if (data?.data?.response[0]) {
    return {
      id: data?.data?.response[0].id,
      bdate: data?.data?.response[0].bdate,
      photo_200: data?.data?.response[0].photo_200,
      first_name: data?.data?.response[0].first_name,
      last_name: data?.data?.response[0].last_name,
      can_access_closed: data?.data?.response[0].can_access_closed,
      is_closed: data?.data?.response[0].is_closed,
    };
  }
}
