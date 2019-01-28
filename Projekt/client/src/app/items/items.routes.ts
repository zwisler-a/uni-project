import { Routes } from '@angular/router';

import { DefaultPageComponent } from '../shared/default-page/default-page.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListResolver } from './items-list/items-list.resolver';
import { ItemTypeListComponent } from './item-type-list/item-type-list.component';
import { TypesResolver } from '../types/types-list/types.resolver';

export const itemsRoutes: Routes = [
    {
        path: 'view',
        component: DefaultPageComponent,
        children: [
            {
                path: '',
                component: ItemTypeListComponent,
                resolve: { types: TypesResolver },
                outlet: 'sidenav'
            },
            {
                path: 'add',
                component: AddItemComponent,
                outlet: 'detail'
            },
            {
                path: 'details/:typeId/:id',
                component: ItemDetailsComponent,
                outlet: 'detail'
            },
            {
                path: ':page/:perPage',
                component: ItemsListComponent,
                resolve: { list: ItemsListResolver },
                outlet: 'content'
            },
            {
                path: ':page/:perPage/:itemTypeId',
                component: ItemsListComponent,
                resolve: { list: ItemsListResolver },
                outlet: 'content'
            },
            {
                path: ':page/:perPage/:orderBy/:order',
                component: ItemsListComponent,
                resolve: { list: ItemsListResolver },
                outlet: 'content'
            },
            {
                path: ':page/:perPage/:itemTypeId/:orderBy/:order',
                component: ItemsListComponent,
                resolve: { list: ItemsListResolver },
                outlet: 'content'
            },
            {
                path: '',
                component: ItemsListComponent,
                resolve: { list: ItemsListResolver },
                outlet: 'content'
            }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'view' }
];
