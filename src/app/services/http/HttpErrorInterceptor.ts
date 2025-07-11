import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';

/**
 * Http error interceptor
 *
 * @param
 *
 * @returns HttpHandler
 *
 * @remarks
 *
 * Interceptor service for error handling of requests/responses between frontend and backend
 *
 * @beta
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandler: HttpErrorHandlerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error);
        return throwError(error);
      })
    );
  }
}
