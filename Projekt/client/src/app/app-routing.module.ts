import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './shell/navigation/navigation.component';

const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: []
    }

    // Redirect all unidentifiable routes to login
    // { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
