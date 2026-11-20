import { Injectable } from '@nestjs/common';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { finalize } from 'rxjs';

@Injectable()
export class RequestTimingInterceptor implements NestInterceptor {
 intercept(context: ExecutionContext, next: CallHandler) {
  const http = context.switchToHttp();
  const request = http.getRequest<Request>();
  const response = http.getResponse<Response>();
  const requestId = response.getHeader('X-Request-Id');
  const startedAt = Date.now();

  return next.handle().pipe(
    finalize(() => {
      const duration = Date.now() - startedAt;
      console.log(
        `[${requestId}] ${request.method} ${request.originalUrl} took ${duration}ms`,
      );
    }),
  );
 }
}
