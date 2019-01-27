import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Observable, throwError, of, empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.check();
    }

    canLoad(route: Route): Observable<boolean> {
        return this.check();
    }

    check() {
        if (!!this.authService.jwt) {
            return of(true);
        }

        return this.authService.reauthenticate().pipe(
            catchError(err => {
                this.router.navigate(['/auth', 'login']);
                return of(false);
            }),
            map(res => true)
        );
    }
}
