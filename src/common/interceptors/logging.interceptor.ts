import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { method, url, body } = request;
    const now = Date.now();

    this.logger.log(`Incoming Request: ${method} ${url}`);
    if (body && Object.keys(body).length > 0) {
      // Avoid logging sensitive data like passwords in production
      const sanitizedBody = { ...body };
      if (sanitizedBody.password) sanitizedBody.password = '***';
      this.logger.debug(`Body: ${JSON.stringify(sanitizedBody)}`);
    }

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `Outgoing Response: ${method} ${url} - ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
