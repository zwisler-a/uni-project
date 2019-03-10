import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { Permission } from '../models/permission.enum';
import { AuthService } from '../shell/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    constructor(private authService: AuthService) {}

    /**
     * Checks if a user has a given permission. If the typeid is set it accesses the roles type permission
     * @param permission Permission enum {@see Permission}
     * @param id TypeId if a permission for a type should be checked
     */
    hasPermission(permission: Permission, id?: string): Observable<boolean> {
        if (!this.authService.authChange) {
            return of(false);
        }
        return this.authService.authChange.pipe(
            startWith(null),
            shareReplay(1),
            map(() => {
                if (this.authService.user) {
                    return id ? this.typePermission(permission, id) : this.userPermission(permission);
                } else {
                    return false;
                }
            })
        );
    }

    private userPermission(permission: Permission) {
        return this.authService.user.roles.some(role => (role.permission & permission) !== 0);
    }

    private typePermission(permission: Permission, id: string) {
        const typeId = Number.parseInt(id, 10);
        return this.authService.user.roles.some(role => (role.types[typeId] & permission) !== 0);
    }
}
