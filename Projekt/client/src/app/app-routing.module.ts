import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shell/auth/auth.guard';
import { NavigationComponent } from './shell/navigation/navigation.component';

const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'items',
                loadChildren: './items/items.module#ItemsModule',
                canLoad: [AuthGuard]
            },
            {
                path: 'types',
                loadChildren: './types/types.module#TypesModule',
                canLoad: [AuthGuard]
            },
            {
                path: 'user',
                loadChildren: './user/user.module#UserModule',
                canLoad: [AuthGuard]
            }
        ]
    }

    // Redirect all unidentifiable routes to login
    // { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload',
            enableTracing: false
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
