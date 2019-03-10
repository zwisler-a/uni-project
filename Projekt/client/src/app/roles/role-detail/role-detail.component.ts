import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/role.interface';

import { RoleService } from '../_roles-store/role.service';
import { Permission } from 'src/app/models/permission.enum';

@Component({
    selector: 'app-role-detail',
    templateUrl: './role-detail.component.html',
    styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit, OnDestroy {
    roleSub: Subscription;
    role: Role;
    edit = false;
    constructor(private activatedRoute: ActivatedRoute, private roleService: RoleService) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const roleId = params['id'];
            this.selectRole(roleId);
        });
    }

    ngOnDestroy(): void {
        if (this.roleSub) {
            this.roleSub.unsubscribe();
        }
    }

    private selectRole(roleId: number) {
        if (this.roleSub) {
            this.roleSub.unsubscribe();
        }
        this.roleSub = this.roleService.getRole(roleId).subscribe((role: Role) => {
            this.role = role;
        });
    }

    save() {
        this.roleService.updateRole(this.role).subscribe(() => {
            this.edit = false;
        });
    }

    // -----------------------------------------------------------------
    // - Translate the permission bits to properties on the controller -
    // -----------------------------------------------------------------
    set globalAdmin(val) {
        if (val) {
            this.role.permission |= Permission.GLOBAL_ADMIN;
        } else {
            this.role.permission &= ~Permission.GLOBAL_ADMIN;
        }
    }
    get globalAdmin() {
        return this.role ? (this.role.permission & Permission.GLOBAL_ADMIN) !== 0 : false;
    }

    set globalField(val) {
        if (val) {
            this.role.permission |= Permission.GLOBAL_FIELD;
        } else {
            this.role.permission &= ~Permission.GLOBAL_FIELD;
        }
    }
    get globalField() {
        return this.role ? (this.role.permission & Permission.GLOBAL_FIELD) !== 0 : false;
    }

    set localAdmin(val) {
        if (val) {
            this.role.permission |= Permission.LOCAL_ADMIN;
        } else {
            this.role.permission &= ~Permission.LOCAL_ADMIN;
        }
    }
    get localAdmin() {
        return this.role ? (this.role.permission & Permission.LOCAL_ADMIN) !== 0 : false;
    }
}
