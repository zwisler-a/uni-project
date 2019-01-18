import { Routes } from '@angular/router';

import { AddTypeComponent } from './add-type/add-type.component';
import { SelectTypeComponent } from './select-type/select-type.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { TypesResolver } from './types-list/types.resolver';
import { TypesPageComponent } from './types-page/types-page.component';

export const typeRoutes: Routes = [
    {
        path: '',
        component: TypesPageComponent,
        resolve: { types: TypesResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'add',
                component: AddTypeComponent
            },
            {
                path: ':id',
                component: TypeDetailComponent
            },
            {
                path: '',
                component: SelectTypeComponent
            }
        ]
    }
];
