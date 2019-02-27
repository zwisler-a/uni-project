import { Route } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { DefaultPageComponent } from '../shared/default-page/default-page.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyResolver } from './_company-store/company.resolver';

export const companyRoutes: Route[] = [
    {
        path: 'view',
        component: DefaultPageComponent,
        resolve: { companies: CompanyResolver },
        children: [
            { path: '', component: CompanyListComponent, outlet: 'content' },
            { path: 'add', component: AddCompanyComponent, outlet: 'detail' }
        ]
    }
];
