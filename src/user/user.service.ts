import { Injectable } from '@nestjs/common';
//
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }


    async getAll() {
        return await this.prisma.user.findMany();
    }


    async update(data: any, userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if (user) {
            await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: data
            })
        }
    }
}
