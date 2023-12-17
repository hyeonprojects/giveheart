import { UserType } from '../../users/enum/users.enum';

export interface RegisterPayload {
    email: string;
    password: string;
    name?: string;
    nickname: string;
    socialId: string;
    phone: string;
    userType: UserType;
}

export interface AuthOutput {
    accessToken: string;
    refreshToken: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}
