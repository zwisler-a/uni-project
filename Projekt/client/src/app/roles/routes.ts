import { Route } from '@angular/router';
import { DefaultPageComponent } from '../shared/default-page/default-page.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { AddRoleComponent } from './add-role/add-role.component';

export const roleRoutes: Route[] = [
    {
        path: 'view',
        component: DefaultPageComponent,
        children: [
            { path: '', component: RoleListComponent, outlet: 'content' },
            { path: 'add', component: AddRoleComponent, outlet: 'detail' },
            { path: ':id', component: RoleDetailComponent, outlet: 'detail' }
        ]
    }
];
