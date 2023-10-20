import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return next.handle(req);
    }

    if (
      token == null ||
      token === undefined ||
      token === 'null' ||
      token.length === 0
    ) {
      return next.handle(req);
    }
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    const secureRequest = req.clone({ headers });
    return next.handle(secureRequest);
  }
}
