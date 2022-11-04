import { Injectable } from '@nestjs/common';
//
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any): Promise<any> {
    return await this.prisma.product.create({
      data: {
        title: 'hi',
        category: 'sneakers',
      },
    });
  }
}
