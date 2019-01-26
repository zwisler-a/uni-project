import { Route } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { DefaultPageComponent } from '../shared/default-page/default-page.component';

export const companyRoutes: Route[] = [
    {
        path: 'view',
        component: DefaultPageComponent,
        children: [{ path: '', component: CompanyListComponent, outlet: 'content' }]
    }
];
