import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/vk')
  async vk(@Body() body: any) {
    return await this.authService.vk(body.code);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt')) // ,RolesGuard
  // @Roles('admin')
  async one(@Headers() head: any) {
    const token = head.authorization.split(' ')[1];
    return await this.authService.findUser(token);
  }
}
