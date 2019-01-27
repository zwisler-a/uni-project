import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { roleRoutes } from './routes';
import { RoleListComponent } from './role-list/role-list.component';
import { DefaultPageModule } from '../shared/default-page/default-page.module';

@NgModule({
    declarations: [RoleListComponent],
    imports: [CommonModule, RouterModule.forChild(roleRoutes), DefaultPageModule]
})
export class RolesModule {}
