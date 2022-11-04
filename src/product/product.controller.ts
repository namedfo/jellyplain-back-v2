import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async get_all() {
    console.log('log');
    return await this.productService.get_all();
  }
}
