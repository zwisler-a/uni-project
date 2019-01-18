import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.check();
    }

    canLoad(route: Route) {
        return this.check();
    }

    check() {
        if (!!this.authService.jwt) {
            return true;
        }
        this.router.navigate(['/auth', 'login']);
        return false;
    }
}
