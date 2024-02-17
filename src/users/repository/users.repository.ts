import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserPayload } from '../interface/user.interface';

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    async findUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { email } });
    }

    async findUserByPhone(phone: string): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { phone } });
    }

    async createUser(payload: CreateUserPayload): Promise<User> {
        return this.prisma.user.create({ data: { ...payload } });
    }
}
