import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';

import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';
import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { NavigateBackModule } from '../shared/navigate-back/navigate-back.module';
import { TypeSelectorModule } from '../shared/type-selector/type-selector.module';
import { TypeStoreModule } from '../types/_type-store/type-store.module';
import { FieldsStoreModule } from './_fields-store/fields-store.module';
import { ItemStoreModule } from './_item-store/item-store.module';
import { AddItemComponent } from './add-item/add-item.component';
import { ColumnSelectComponent } from './column-select/column-select.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemFieldBoolComponent } from './item-field/item-field-bool/item-field-bool.component';
import { ItemFieldColorComponent } from './item-field/item-field-color/item-field-color.component';
import { ItemFieldDateComponent } from './item-field/item-field-date/item-field-date.component';
import { ItemFieldFileComponent } from './item-field/item-field-file/item-field-file.component';
import { ItemFieldNumberComponent } from './item-field/item-field-number/item-field-number.component';
import { ItemFieldReferenceComponent } from './item-field/item-field-reference/item-field-reference.component';
import { ItemFieldReferenceService } from './item-field/item-field-reference/item-field-reference.service';
import { ItemFieldStringComponent } from './item-field/item-field-string/item-field-string.component';
import { ItemFieldComponent } from './item-field/item-field.component';
import { ItemTypeListComponent } from './item-type-list/item-type-list.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListResolver } from './items-list/items-list.resolver';
import { ItemsMaterialModule } from './items.material';
import { itemsRoutes } from './items.routes';
import { PermissionModule } from '../permission/permission.module';

@NgModule({
    declarations: [
        ItemsListComponent,
        ItemDetailsComponent,
        ItemFieldComponent,
        ItemFieldStringComponent,
        ItemFieldNumberComponent,
        ItemFieldColorComponent,
        ItemFieldDateComponent,
        ItemFieldFileComponent,
        ItemFieldBoolComponent,
        ItemFieldReferenceComponent,
        AddItemComponent,
        ItemTypeListComponent,
        ColumnSelectComponent
    ],
    imports: [
        // NPM modules
        CommonModule,
        TranslateModule.forChild(),
        ColorPickerModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(itemsRoutes),

        // Local modules
        ItemStoreModule,
        TypeStoreModule.forChild(),
        PermissionModule.forChild(),
        FieldsStoreModule,
        ItemsMaterialModule,

        // Shared modules
        ConfirmDialogModule,
        DefaultPageModule,
        NavigateBackModule,
        TypeSelectorModule
    ],
    providers: [ItemsListResolver, ItemFieldReferenceService],
    entryComponents: [ColumnSelectComponent]
})
export class ItemsModule {}
