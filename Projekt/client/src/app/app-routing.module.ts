import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './shell/auth/auth.guard';
import {NavigationComponent} from './shell/navigation/navigation.component';

const routes: Routes = [
    {
        path: 'resetpassword/:id/:token',
        loadChildren: './shell/reset-password/change-password/change-password.module#ChangePasswordModule'
    },
    {
        path: 'resetpassword',
        loadChildren: './shell/reset-password/reset-password.module#ResetPasswordModule'
    },
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
            },
            {
                path: 'roles',
                loadChildren: './roles/roles.module#RolesModule',
                canLoad: [AuthGuard]
            },
            {
                path: 'companies',
                loadChildren: './company/company.module#CompanyModule',
                canLoad: [AuthGuard]
            },

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
export class AppRoutingModule {
}
