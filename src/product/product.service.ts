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
    console.log(query);
    return await this.prisma.product.findMany({
      where: {
        category: query.category,
        subcategory: query.subcategory,
        price: {
          // gte: min price
          // lte max price
          gte: Number(query.minPrice) || 0,
          lte: Number(query.maxPrice) || 9999,
        },
        brand: query.brand,
        type: query.type,
        productChilds: {
          some: {
            color: {
              in: query.colors,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        productChilds: {
          include: {
            images: true,
          },
        },
      },
    });

    // return await this.prisma.product.findMany({
    //   include: {
    //     productChilds: {
    //       include: {
    //         images: true,
    //       },
    //     },
    //   },
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });
  }
  async get_one(query: any) {
    return await this.prisma.product.findUnique({
      where: {
        id: +query.id,
      },
      include: {
        productChilds: {
          include: {
            images: true,
          },
        },
      },
    });
  }
}
