import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingFilterInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingFilterInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const request = context.switchToHttp().getRequest();
        const body = JSON.stringify(request.body);
        const query = JSON.stringify(request.query);
        const params = JSON.stringify(request.params);

        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse();
                const responseTime = Date.now() - now;
                const log = {
                    request: {
                        method: request.method,
                        url: request.url,
                        body,
                        query,
                        params,
                    },
                    response: {
                        statusCode: response.statusCode,
                        responseTime,
                    },
                };

                this.logger.log(JSON.stringify(log));
            }),
        );
    }
}
