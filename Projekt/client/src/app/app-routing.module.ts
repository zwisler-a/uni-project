import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './shell/navigation/navigation.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { FieldsService } from './items/fields.service';

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
                path: '2',
                children: []
            }
        ]
    }

    // Redirect all unidentifiable routes to login
    // { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
