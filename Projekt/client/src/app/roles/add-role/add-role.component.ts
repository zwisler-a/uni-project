import { Component, OnInit } from '@angular/core';
import { RoleService } from '../_roles-store/role.service';
import { IRole } from 'src/app/models/role.interface';
import { Permission } from 'src/app/models/permission.enum';

@Component({
    selector: 'app-add-role',
    templateUrl: './add-role.component.html',
    styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
    newRole: IRole = {
        name: '',
        permission: 0,
        types: {}
    };

    constructor(private roleService: RoleService) {}

    ngOnInit() {}

    save() {
        this.roleService.createRole(this.newRole).subscribe();
    }

    set globalAdmin(val) {
        if (val) {
            this.newRole.permission |= Permission.GLOBAL_ADMIN;
        } else {
            this.newRole.permission &= ~Permission.GLOBAL_ADMIN;
        }
    }
    set localAdmin(val) {
        if (val) {
            this.newRole.permission |= Permission.LOCAL_ADMIN;
        } else {
            this.newRole.permission &= ~Permission.LOCAL_ADMIN;
        }
    }

    set globalField(val) {
        if (val) {
            this.newRole.permission |= Permission.GLOBAL_FIELD;
        } else {
            this.newRole.permission &= ~Permission.GLOBAL_FIELD;
        }
    }
}
