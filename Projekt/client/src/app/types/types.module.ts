import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';
import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { NavigateBackModule } from '../shared/navigate-back/navigate-back.module';
import { TypeSelectorModule } from '../shared/type-selector/type-selector.module';
import { AddTypeComponent } from './add-type/add-type.component';
import { GlobalFieldsComponent } from './global-fields/global-fields.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { FieldTypeSelectComponent } from './type-field/field-type-select/field-type-select.component';
import { TypeFieldComponent } from './type-field/type-field.component';
import { TypesListComponent } from './types-list/types-list.component';
import { typeRoutes } from './types.routes';
import { PermissionModule } from '../permission/permission.module';

@NgModule({
    declarations: [
        TypesListComponent,
        TypeDetailComponent,
        TypeFieldComponent,
        AddTypeComponent,
        GlobalFieldsComponent,
        FieldTypeSelectComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(typeRoutes),
        PermissionModule.forChild(),
        MatListModule,
        MatCardModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatMenuModule,
        FormsModule,
        NavigateBackModule,
        ConfirmDialogModule,
        DefaultPageModule,
        TypeSelectorModule,
        MatToolbarModule,
        TranslateModule
    ],
    providers: []
})
export class TypesModule {}
