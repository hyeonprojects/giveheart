export interface CreateUserPayload {
    email: string;
    password: string;
    name?: string;
    nickname: string;
    socialId: string;
    phone: string;
    userType: string;
}
