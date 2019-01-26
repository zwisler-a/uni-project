import { Route } from '@angular/router';
import { DefaultPageComponent } from '../shared/default-page/default-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const userRoutes: Route[] = [
    {
        path: 'view',
        component: DefaultPageComponent,
        children: [
            { path: '', component: UserListComponent, outlet: 'content' },
            { path: ':id', component: UserDetailComponent, outlet: 'detail' }
        ]
    }
];
