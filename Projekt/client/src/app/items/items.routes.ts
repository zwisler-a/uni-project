import { Routes } from '@angular/router';

import { FieldsService } from './fields.service';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemResolver } from './item-details/item.resolver';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListResolver } from './items-list/items-list.resolver';
import { ItemPageComponent } from './item-page/item-page.component';

export const itemsRoutes: Routes = [
    {
        path: 'view/:typeId/:id',
        component: ItemDetailsComponent,
        resolve: { item: ItemResolver },
        runGuardsAndResolvers: 'always'
    },
    {
        path: ':page/:perPage',
        component: ItemPageComponent,
        resolve: { list: ItemsListResolver, fields: FieldsService }
    },
    {
        path: ':page/:perPage/:itemTypeId',
        component: ItemPageComponent,
        resolve: { list: ItemsListResolver, fields: FieldsService }
    },
    {
        path: '',
        component: ItemPageComponent,
        resolve: { list: ItemsListResolver, fields: FieldsService }
    }
];
