import { UserType } from '../enum/users.enum';

export interface CreateUserPayload {
    email: string;
    password: string;
    name?: string;
    nickname: string;
    socialId: string;
    phone: string;
    userType: UserType;
}
