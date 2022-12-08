import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { UserService } from './user.service';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @UseGuards(AuthGuard('jwt')) // ,RolesGuard
    @Post('update')
    async create(@Body() body: any, @Req() req: any) {
      return await this.userService.update(body, req?.user?.id);
    }

    @Get('getAll')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    async getAll() {
        return await this.userService.getAll();
    }
  }
  