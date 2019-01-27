import { Route } from '@angular/router';
import { DefaultPageComponent } from '../shared/default-page/default-page.component';
import { RoleListComponent } from './role-list/role-list.component';

export const roleRoutes: Route[] = [
    { path: 'view', component: DefaultPageComponent, children: [{ path: '', component: RoleListComponent, outlet: 'content' }] }
];
