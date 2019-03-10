import { Component, Host, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { IRole } from 'src/app/models/role.interface';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

import { RoleService } from '../_roles-store/role.service';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
    roles: Observable<IRole[]>;

    constructor(
        @Optional() @Host() private defaultPage: DefaultPageComponent,
        private roleService: RoleService,
        private router: Router
    ) {}

    ngOnInit() {
        if (!this.defaultPage) {
            return;
        }
        this.roleService.loadRoles().subscribe();
        this.defaultPage.title = 'role.title';
        this.defaultPage.actions.next([
            {
                icon: 'add',
                click: () => {
                    this.router.navigate(['/roles', 'view', { outlets: { detail: ['add'] } }]);
                },
                tooltip: 'Add'
            }
        ]);
        this.roles = combineLatest(this.defaultPage.search, this.roleService.roles, (query, roles) => {
            return roles.filter(role => role.name.includes(query));
        });
    }
}
