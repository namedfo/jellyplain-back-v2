import { Injectable } from '@nestjs/common';
//
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    // return await this.prisma.product.create({
    //   data: {
    //     title: dto.title,
    //     image: dto.image,
    //     price: dto.price,
    //     category: dto.category,
    //   },
    // });
    return 'hi';
  }

  async get_all(query: any): Promise<any> {
    if (query.category) {
      return await this.prisma.product.findMany({
        where: {
          category: query.category,
        },
        include: {
          productChilds: {
            include: {
              image: true,
              size: true,
            },
          },
          reviews: true,
        },
      });
    }

    return await this.prisma.product.findMany({
      include: {
        productChilds: true,
        reviews: true,
      },
    });
  }
}
