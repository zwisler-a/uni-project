import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent } from './shell/navigation/navigation.component';

const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            {
                path: 'items',
                loadChildren: './items/items.module#ItemsModule'
            },
            {
                path: 'types',
                loadChildren: './types/types.module#TypesModule'
            }
        ]
    },

    // Redirect all unidentifiable routes to items
    { path: '**', redirectTo: '/items/view', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
