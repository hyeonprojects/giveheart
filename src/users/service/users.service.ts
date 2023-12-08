import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { User } from '@prisma/client';
import { CreateUserPayload } from '../interface/user.interface';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async findUserById(id: string): Promise<User | null> {
        return this.usersRepository.findUserById(id);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findUserByEmail(email);
    }

    async createUser(payload: CreateUserPayload): Promise<User> {
        return this.usersRepository.createUser({ ...payload });
    }
}
