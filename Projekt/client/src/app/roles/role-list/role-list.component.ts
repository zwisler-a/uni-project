import { Component, OnInit, Optional, Host } from '@angular/core';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';
import { RoleService } from '../_roles-store/role.service';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Role } from 'src/app/models/role.interface';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
    roles: Observable<Role[]>;

    constructor(@Optional() @Host() private defaultPage: DefaultPageComponent, private roleService: RoleService) {}

    ngOnInit() {
        this.roleService.loadRoles().subscribe();
        if (!this.defaultPage) {
            return;
        }
        this.defaultPage.title = 'roles.title';
        this.roles = combineLatest(this.defaultPage.search, this.roleService.roles, (query, roles) => {
            return roles.filter(role => role.name.includes(query));
        });
    }
}
