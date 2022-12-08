import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
//
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('count')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async products() {
    return await this.productService.productsCount();
  }

  @Post('createOne')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async create(@Body() dto: any) {
    return await this.productService.create(dto);
  }

  @Post('getAll')
  async get_all(@Body() body: any) {
    return await this.productService.get_all(body);
  }

  @Get('getOne')
  async get_one(@Query() query: any) {
    return await this.productService.get_one(query);
  }
}
