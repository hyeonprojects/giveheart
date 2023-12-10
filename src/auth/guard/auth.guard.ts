import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractJwtFromRequest(request);
        if (!token) {
            throw new UnauthorizedException('Not User Authenticated');
        }
        try {
            const decoded = this.authService.validateUser();
        } catch (e) {
            throw new UnauthorizedException('Not User Authenticated');
        }
        return true;
    }

    private extractJwtFromRequest(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
