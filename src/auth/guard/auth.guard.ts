import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../service/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private tokenService: TokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('토큰이 없습니다.');
        }
        try {
            request['user'] = await this.tokenService.verifyAccessToken(token);
        } catch {
            throw new UnauthorizedException('토큰이 유효하지 않습니다.');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] =
            request.headers.get('authorization')?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
