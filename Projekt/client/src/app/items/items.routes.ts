import { Routes } from '@angular/router';

import { FieldsService } from './fields.service';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDetailResolver } from './item-details/item-details.resolver';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListResolver } from './items-list/items-list.resolver';
import { ItemPageComponent } from './item-page/item-page.component';
import { AddItemComponent } from './add-item/add-item.component';
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
                resolve: { item: ItemDetailResolver },
                runGuardsAndResolvers: 'always',
                outlet: 'detail'
            },
            {
                path: ':page/:perPage',
                component: ItemPageComponent,
                resolve: { list: ItemsListResolver },
                runGuardsAndResolvers: 'always',
                outlet: 'content'
            },
            {
                path: ':page/:perPage/:itemTypeId',
                component: ItemPageComponent,
                resolve: { list: ItemsListResolver },
                runGuardsAndResolvers: 'always',
                outlet: 'content'
            },
            {
                path: '',
                component: ItemPageComponent,
                resolve: { list: ItemsListResolver, fields: FieldsService },
                outlet: 'content'
            }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'view' }
];
