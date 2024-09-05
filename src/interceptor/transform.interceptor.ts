import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  status: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({ data: data, status: 1 })),
      catchError((err) => {
        // Catch the error and throw a new error or log the error
        console.error('Error in TransformInterceptor:', err);
        
        // Throw a new error or pass the error through
        return throwError(() => new BadGatewayException('Something went wrong!'));
      }),
    );
  }
}
