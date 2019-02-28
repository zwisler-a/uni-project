import { Component, OnInit } from '@angular/core';
import { RoleService } from '../_roles-store/role.service';
import { IRole, PERMISSIONS } from 'src/app/models/role.interface';

@Component({
    selector: 'app-add-role',
    templateUrl: './add-role.component.html',
    styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
    newRole: IRole = {
        name: '',
        permission: [],
        types: {}
    };

    constructor(private roleService: RoleService) {}

    ngOnInit() {}

    save() {
        // this.roleService.createRole({});
        console.log(this.newRole);
    }

    set globalAdmin(val) {
        if (this.newRole.permission.includes(PERMISSIONS.GLOBAL_ADMIN) && !val) {
            this.newRole.permission.splice(this.newRole.permission.indexOf(PERMISSIONS.GLOBAL_ADMIN));
        }
        if (!this.newRole.permission.includes(PERMISSIONS.GLOBAL_ADMIN) && val) {
            this.newRole.permission.push(PERMISSIONS.GLOBAL_ADMIN);
        }
    }
    set localAdmin(val) {
        if (this.newRole.permission.includes(PERMISSIONS.LOCAL_ADMIN) && !val) {
            this.newRole.permission.splice(this.newRole.permission.indexOf(PERMISSIONS.LOCAL_ADMIN));
        }
        if (!this.newRole.permission.includes(PERMISSIONS.LOCAL_ADMIN) && val) {
            this.newRole.permission.push(PERMISSIONS.LOCAL_ADMIN);
        }
    }
}
