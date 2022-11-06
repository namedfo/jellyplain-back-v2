import { Body, Controller, Get, Post, Query } from '@nestjs/common';
//
import { ProductService } from './product.service';

@Controller('order')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('createOne')
  async create(@Body() dto: any) {
    return await this.productService.create(dto);
  }

  @Get('getAll')
  async get_all(@Query() query: any) {
    return await this.productService.get_all(query);
  }

  @Get('getOne')
  async get_one(@Query() query: any) {
    return await this.productService.get_one(query);
  }
}
