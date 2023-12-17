export interface TokenInterface {
    iss: string;
    sub: string;
    aud: string;
    exp: Date;
    iat: Date;
    nbf: Date;
}
