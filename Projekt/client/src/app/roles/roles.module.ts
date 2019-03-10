import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { NavigateBackModule } from '../shared/navigate-back/navigate-back.module';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListComponent } from './role-list/role-list.component';
import { roleRoutes } from './routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AddRoleComponent } from './add-role/add-role.component';
import { TypesPermissionsComponent } from './types-permissions/types-permissions.component';

@NgModule({
    declarations: [RoleListComponent, RoleDetailComponent, AddRoleComponent, TypesPermissionsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(roleRoutes),
        DefaultPageModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        TranslateModule,
        FlexLayoutModule,
        FormsModule,
        MatCheckboxModule,
        NavigateBackModule
    ]
})
export class RolesModule {}
