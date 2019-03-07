import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/role.interface';

import { RoleService } from '../_roles-store/role.service';

@Component({
    selector: 'app-role-detail',
    templateUrl: './role-detail.component.html',
    styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit, OnDestroy {
    roleSub: Subscription;
    role: Role;
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
        this.roleService.updateRole(this.role).subscribe();
    }
}
