import { Injectable } from '@angular/core';
import { Permission } from '../models/permission.enum';
import { AuthService } from '../shell/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    constructor(private authService: AuthService) {}

    hasPermission(permission: Permission, id?: number) {
        return id ? this.typePermission(permission, id) : this.userPermission(permission);
    }

    private userPermission(permission: Permission) {
        return this.authService.user.roles.some(role => (role.permission & permission) !== 0);
    }

    private typePermission(permission: Permission, id?: number) {
        return this.authService.user.roles.some(role => (role.types[id].permission & permission) !== 0);
    }
}
