import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

/**
 * Authorization:
 * Interceptor to add the jwt to each request.
 * If a request is made and it gets a 401 from the server it tries to request a new short lived jwt before failing the request.
 * If the request for a new short lived token succeeds, is sends the request triggering the 401 again.
 *
 * X-companyId:
 * It also appends the companyId header. This is actually just needed for when a 'global admin' changes
 * the company but is appended to every request for simplicty. The id is taken from the AuthService.user object
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
