import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../_user-store/user.service';

/** Makes sure the users are loaded before resolving */
@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<any> {
    constructor(private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.userService.loadUsers();
    }
}
