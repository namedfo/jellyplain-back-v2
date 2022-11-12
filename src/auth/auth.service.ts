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

  async vk(body: any) {
    return "ee"
    // const vkUserData: any = await this.getUserDataFromVk(body.id, body.token);

    // const _user = await this.prisma.user.findUnique({
    //   where: {
    //     vkID: vkUserData.id,
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

  async getUserDataFromVk(userId: number, token: string) {
    const data: any = await this.http.axiosRef.get(
      `https://api.vk.com/method/users.get?user_ids=${userId}&fields=photo_200,bdate&access_token=${token}&v=5.131`,
    );

    return {
      id: data.data.response[0].id,
      first_name: data.data.response[0].first_name,
      last_name: data.data.response[0].last_name,
      image: data.data.response[0].photo_200,
      bdate: data.data.response[0].bdate,
    };
  }
}
