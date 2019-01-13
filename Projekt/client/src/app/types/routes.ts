import { Routes } from '@angular/router';
import { TypesPageComponent } from './types-page/types-page.component';
import { TypesResolver } from './types-list/types.resolver';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { TypeResolver } from './type-detail/type.resolver';
import { AddTypeComponent } from './add-type/add-type.component';
import { SelectTypeComponent } from './select-type/select-type.component';

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
                component: TypeDetailComponent,
                resolve: { type: TypeResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: '',
                component: SelectTypeComponent
            }
        ]
    }
];
