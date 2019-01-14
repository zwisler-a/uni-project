import { Routes } from '@angular/router';

import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDetailResolver } from './item-details/item-details.resolver';
import { ItemPageComponent } from './item-page/item-page.component';
import { ItemsListResolver } from './items-list/items-list.resolver';
import { SidenavOverlayComponent } from './sidenav-overlay/sidenav-overlay.component';
import { TypesService } from './types.service';

export const itemsRoutes: Routes = [
    {
        path: 'view',
        component: SidenavOverlayComponent,
        resolve: { types: TypesService },
        children: [
            {
                path: 'add',
                component: AddItemComponent,
                outlet: 'detail'
            },
            {
                path: 'details/:typeId/:id',
                component: ItemDetailsComponent,
                resolve: { item: ItemDetailResolver },
                outlet: 'detail'
            },
            {
                path: ':page/:perPage',
                component: ItemPageComponent,
                resolve: { list: ItemsListResolver },
                outlet: 'content'
            },
            {
                path: ':page/:perPage/:itemTypeId',
                component: ItemPageComponent,
                resolve: { list: ItemsListResolver },
                outlet: 'content'
            },
            {
                path: '',
                component: ItemPageComponent,
                resolve: { list: ItemsListResolver },
                outlet: 'content'
            }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'view' }
];
