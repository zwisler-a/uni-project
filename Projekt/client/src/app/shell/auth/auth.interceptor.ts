import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

/** Injector to append the Authorization header on every request done.
 *  If the AuthService has a jwt available
 */
@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.jwt) {
      const headers = req.headers.set(
        'Authorization',
        'Bearer ' + this.authService.jwt
      );
      const authReq = req.clone({ headers });
      return next.handle(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
          // If 401 reauthenticate
          if (err.status === 401) {
            this.authService.logout();
          }
          return throwError(err);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
