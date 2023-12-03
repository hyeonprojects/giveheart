import { Injectable } from '@nestjs/common';
import {UsersRepository} from "../repository/users.repository";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async findUserById(id: string) {
        return this.usersRepository.findUserById(id);
    }
}
