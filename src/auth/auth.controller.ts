import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/vk')
  async vk(@Body() body: any) {
    return await this.authService.vk(body);
  }

//   @Get('one')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles('admin')
//   async one() {
//     return await this.authService.findUser();
//   }
}
