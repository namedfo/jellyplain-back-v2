import { Injectable } from '@nestjs/common';
//
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}


  async productsCount() {
    return await this.prisma.product.count();
  }

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

  async get_all(body: any): Promise<any> {
    console.log(body);
    return await this.prisma.product.findMany({
      where: {
        category: body?.category,
        subcategory: body?.subcategory,
        price: {
          // gte: min price
          // lte max price
          gte: Number(body?.minPrice) || 0,
          lte: Number(body?.maxPrice) || 9999,
        },
        brand: { in: body?.brands },
        type: body?.type,
        productChilds: {
          some: {
            color: {
              in: body?.colors,
            },
            sizesSneakers: body?.sizesSneakers
              ? {
                  hasSome: body?.sizesSneakers,
                }
              : undefined,
            sizesClothes: body?.sizesClothes
              ? {
                  hasSome: body?.sizesClothes,
                }
              : undefined,
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
