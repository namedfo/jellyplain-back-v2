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
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt')) // ,RolesGuard
  // @Roles('admin')
  async one(@Req() req: any, @Headers() head: any) {
    // console.log(req)
    const token = head.authorization.split(' ')[1];
    return await this.authService.findUser(token);
  }

  @Get('meAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async meAdmin(@Headers() head: any) {
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
    // console.log(token)
    return res.redirect(
      `http://localhost:3000/auth?token=${token}`,
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
      `http://localhost:3000/auth?token=${token}`,
    );
  }

  //
  @Get('login/vkontakte-admin')
  @UseGuards(AuthGuard('vkontakte-admin'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async vkontakteAdmin() {}

  @Get('login/vkontakte-admin/redirect')
  @UseGuards(AuthGuard('vkontakte-admin'))
  async vkontakteAdminRedirect(@Req() req: any, @Res() res: any) {
    const token = await this.authService.vkontakte(req?.user?.profile);
    return res.redirect(
      `http://localhost:3000/auth?token=${token}`,
    );
  }

  @Get('login/google-admin')
  @UseGuards(AuthGuard('google-admin'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAdmin() {}

  @Get('login/google-admin/redirect')
  @UseGuards(AuthGuard('google-admin'))
  async googleAdminRedirect(@Req() req: any, @Res() res: any) {
    const token = await this.authService.google(req?.user);
    return res.redirect(
      `http://localhost:3000/auth?token=${token}`,
    );
  }
}
