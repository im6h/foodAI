import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as Sentry from '@sentry/minimal';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(null, exception => {
        if (
          process.env.NODE_ENV &&
          (process.env.NODE_ENV === 'dev' ||
            process.env.NODE_ENV === 'production') &&
          !(exception instanceof HttpException)
        ) {
          try {
            const ctx = context.switchToHttp();
            // const response = ctx.getResponse();
            const request = ctx.getRequest();
            exception.path = request.url;
            const serverSwagger =
              process.env.SWAGGER_URL || `http://127.0.0.1:3000/`;
            exception.request = {
              // method: request,
              body: request.body,
              path: request.url,
              url: serverSwagger,
              method: request.method,
            };
            // console.log('exception', JSON.stringify(exception));
            Sentry.addBreadcrumb({
              message: '' + JSON.stringify(exception),
            });
            /* tslint:disable */
          } catch (e) {}
          /* tslint:enable */
          Sentry.captureException(exception);
        }
      }),
    );
  }
}
