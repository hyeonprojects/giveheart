import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../repository/users.repository';
import { User } from '@prisma/client';

describe('UsersService', () => {
    let service: UsersService;
    let usersRepository: UsersRepository;
    let user: User;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UsersRepository,
                    useValue: {
                        findUserById: jest.fn(),
                        findUserByEmail: jest.fn(),
                        createUser: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        usersRepository = module.get<UsersRepository>(UsersRepository);

        user = {
            id: '3fdf1998-080d-4ff7-9460-4fa2ff2fe477',
            email: 'test@test.com',
            password: 'ecryptedPassword',
            name: 'user',
            nickname: 'user',
            phone: '01012345678',
            userType: 'USER',
            socialId: 'userSocialId',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: undefined,
        };
    });

    it('finds user by id successfully', async () => {
        jest.spyOn(usersRepository, 'findUserById').mockResolvedValue(user);

        expect(await service.findUserById('1')).toBe(user);
    });

    it('returns null when user id is not found', async () => {
        jest.spyOn(usersRepository, 'findUserById').mockResolvedValue(null);

        expect(await service.findUserById('1')).toBeNull();
    });

    it('finds user by email successfully', async () => {
        jest.spyOn(usersRepository, 'findUserByEmail').mockResolvedValue(user);

        expect(await service.findUserByEmail('test@test.com')).toBe(user);
    });

    it('returns null when user email is not found', async () => {
        jest.spyOn(usersRepository, 'findUserByEmail').mockResolvedValue(null);

        expect(await service.findUserByEmail('test@test.com')).toBeNull();
    });

    it('creates a user successfully', async () => {
        jest.spyOn(usersRepository, 'createUser').mockResolvedValue(user);
    });
});
