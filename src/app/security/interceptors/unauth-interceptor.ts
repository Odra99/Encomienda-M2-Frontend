import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CurrentUserService } from 'src/app/services/others/current-user.service';

@Injectable()
export class UnauthInterceptor implements HttpInterceptor {

  constructor(
    private currentUserService: CurrentUserService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        _ => { },
        (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.currentUserService.logout();
          }
        }
      )
    );
  }

}