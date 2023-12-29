import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { User } from '@prisma/client';
import { CreateUserPayload } from '../interface/user.interface';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    /**
     * Find user by id
     * @param id
     */
    async findUserById(id: string): Promise<User | null> {
        return this.usersRepository.findUserById(id);
    }

    /**
     * Find user by email
     * @param email
     */
    async findUserByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findUserByEmail(email);
    }

    /**
     * Find user by phone
     * @param phone
     */
    async findUserByPhone(phone: string): Promise<User | null> {
        return this.usersRepository.findUserByPhone(phone);
    }

    /**
     * Find user by email
     * @param email
     */
    async createUser(payload: CreateUserPayload): Promise<User | null> {
        return this.usersRepository.createUser({ ...payload });
    }
}
