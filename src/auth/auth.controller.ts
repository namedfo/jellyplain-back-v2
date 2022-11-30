import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt')) // ,RolesGuard
  // @Roles('admin')
  async one(@Headers() head: any) {
    const token = head.authorization.split(' ')[1];
    return await this.authService.findUser(token);
  }

  @Get('login/vkontakte')
  @UseGuards(AuthGuard('vkontakte'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async vkontakte() {}

  @Get('login/vkontakte/redirect')
  @UseGuards(AuthGuard('vkontakte'))
  async vkontakteRedirect(@Req() req: any, @Res() res: any) {
    const token = await this.authService.vkontakte(req?.user?.profile);
    return res.redirect(
      `https://jellyplain-main.vercel.app/auth?token=${token}`,
    );
  }

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async google() {}

  @Get('login/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: any, @Res() res: any) {
    const token = await this.authService.google(req?.user);
    return res.redirect(
      `https://jellyplain-main.vercel.app/auth?token=${token}`,
    );
  }
}
