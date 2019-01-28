import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, retryWhen, flatMap } from 'rxjs/operators';

/** Injector to append the Authorization header on every request done.
 *  If the AuthService has a jwt available
 */
@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.jwt) {
            let headers = req.headers
                .set('Authorization', 'Bearer ' + this.authService.jwt)
                .set('X-comapnyId', this.authService.user.companyId.toString());
            const authReq = req.clone({ headers });
            return next.handle(authReq).pipe(
                catchError(error => {
                    if (error.status === 401) {
                        return this.authService.reauthenticate().pipe(
                            flatMap(res => {
                                headers = req.headers.set('Authorization', 'Bearer ' + this.authService.jwt);
                                return next.handle(req.clone({ headers }));
                            }),
                            catchError(err => {
                                this.authService.logout();
                                return throwError(err);
                            })
                        );
                    }
                    return throwError(error);
                })
            );
        } else {
            return next.handle(req);
        }
    }
}
