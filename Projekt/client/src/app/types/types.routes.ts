import { Routes } from '@angular/router';

import { DefaultPageComponent } from '../shared/default-page/default-page.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { TypesListComponent } from './types-list/types-list.component';
import { TypesResolver } from './_type-store/types.resolver';
import { GlobalFieldsComponent } from './global-fields/global-fields.component';

export const typeRoutes: Routes = [
    {
        path: 'view',
        component: DefaultPageComponent,
        resolve: { types: TypesResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'add',
                component: AddTypeComponent,
                outlet: 'detail'
            },
            {
                path: 'fields',
                component: GlobalFieldsComponent,
                outlet: 'detail'
            },
            {
                path: ':id',
                component: TypeDetailComponent,
                outlet: 'detail'
            },
            {
                path: '',
                component: TypesListComponent,
                outlet: 'content'
            }
        ]
    }
];
