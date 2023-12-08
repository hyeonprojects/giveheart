export interface SingInPayload {
    email: string;
    password: string;
    name?: string
    nickname: string;
    socialId: string;
    phone: number;
    userType: string;
}
