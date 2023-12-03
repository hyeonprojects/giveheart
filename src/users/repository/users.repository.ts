import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    async findUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                email,
            },
        });
    }

    async findUserByPhone(phone: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                phone,
            },
        });
    }
}
