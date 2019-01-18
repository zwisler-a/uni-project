import { Routes } from '@angular/router';

import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { ItemsListResolver } from './items-list/items-list.resolver';
import { SidenavOverlayComponent } from './sidenav-overlay/sidenav-overlay.component';

export const itemsRoutes: Routes = [
    {
        path: 'view',
        component: SidenavOverlayComponent,
        children: [
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
