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

  async findUser() {
    return 'hi';
    // return await this.prisma.user.findUnique({
    //   where: {
    //     id: id,
    //   },
    // });
  }

  async vk(code: string) {
    const getTokenAndUserId = await this.getVkToken(code);

    // const vkUserData: any = await this.getUserDataFromVk(body.id, body.token);

    // const _user = await this.prisma.user.findUnique({
    //   where: {
    //     vkID: vkUserData?.id,
    //   },
    // });
    // if (_user) {
    //   return {
    //     ..._user,
    //     token: this.jwtService.sign({ id: _user.id }),
    //   };
    // }
    // if (vkUserData.id && !_user) {
    //   const newUser = await this.prisma.user.create({
    //     data: {
    //       vkID: vkUserData.id,
    //       first_name: vkUserData.first_name,
    //       last_name: vkUserData.last_name,
    //       avatar_url: vkUserData.image,
    //       bdate: vkUserData.bdate,
    //     },
    //   });
    //   return {
    //     ...newUser,
    //     token: this.jwtService.sign({ id: newUser.id }),
    //   };
    // }
  }

  async getVkToken(code: string) {
    const token: any = await this.http.axiosRef.get(
      `https://oauth.vk.com/access_token?client_id=51473574&client_secret=eyukYXPWuEzwSvYkKM5x&redirect_uri=https://jellyplain-main.vercel.app/redirect&code=${code}`,
    );
    console.log(token);
  }

  async getUserDataFromVk(userId: number, token: string) {
    const data: any = await this.http.axiosRef.get(
      `https://api.vk.com/method/users.get?user_ids=${userId}&fields=photo_200,bdate&access_token=${token}&v=5.131`,
    );

    console.log(data?.data);
    // if (data?.data?.response[0]) {
    // return {
    //   id: data.data.response[0]?.id,
    //   first_name: data.data.response[0]?.first_name,
    //   last_name: data.data.response[0]?.last_name,
    //   image: data.data.response[0]?.photo_200,
    //   bdate: data.data.response[0]?.bdate,
    // };
    // return {
    //   id: 2,
    //   createdAt: '2022-11-12T14:28:19.356Z',
    //   updatedAt: '2022-11-12T14:28:19.356Z',
    //   vkID: 286453384,
    //   role: 'default',
    //   bdate: '28.6.2005',
    //   first_name: 'Миша',
    //   last_name: 'Полещенков',
    //   avatar_url:
    //     'https://sun1.userapi.com/sun1-84/s/v1/ig2/rDRmDR9Fd9HKxnwviOE1UQ3krBOX6TG8_Ivbn2BlS9XDA_iltzzg0E2uZqULWZ17v-sTIUmKX8QuIhXZeWSkceXm.jpg?size=200x200&quality=96&crop=0,16,200,200&ava=1',
    //   token:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY4MzI0NDc0LCJleHAiOjE2Njg0MTA4NzR9.zcYQYUahsYd5yVk1jsc4wVD805Ymy8r44nGs54lyg2s',
    // };
    // }
    return {
      id: 286453384,
      bdate: '28.6.2005',
      photo_200:
        'https://sun1.userapi.com/sun1-84/s/v1/ig2/rDRmDR9Fd9HKxnwviOE1UQ3krBOX6TG8_Ivbn2BlS9XDA_iltzzg0E2uZqULWZ17v-sTIUmKX8QuIhXZeWSkceXm.jpg?size=200x200&quality=96&crop=0,16,200,200&ava=1',
      first_name: 'Миша',
      last_name: 'Полещенков',
      can_access_closed: true,
      is_closed: false,
    };
  }
}
