import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';

import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';
import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { TypeNameModule } from '../shared/type-name-pipe/type-name.module';
import { TypeSelectorModule } from '../shared/type-selector/type-selector.module';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemFieldBoolComponent } from './item-field/item-field-bool/item-field-bool.component';
import { ItemFieldColorComponent } from './item-field/item-field-color/item-field-color.component';
import { ItemFieldDateComponent } from './item-field/item-field-date/item-field-date.component';
import { ItemFieldFileComponent } from './item-field/item-field-file/item-field-file.component';
import { ItemFieldNumberComponent } from './item-field/item-field-number/item-field-number.component';
import { ItemFieldReferenceComponent } from './item-field/item-field-reference/item-field-reference.component';
import { ItemFieldStringComponent } from './item-field/item-field-string/item-field-string.component';
import { ItemFieldComponent } from './item-field/item-field.component';
import { ItemTypeListComponent } from './item-type-list/item-type-list.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListResolver } from './items-list/items-list.resolver';
import { itemsRoutes } from './items.routes';
import { ItemStoreModule } from './_item-store/item-store.module';
import { FieldsStoreModule } from './_fields-store/fields-store.module';

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
        ItemTypeListComponent
    ],
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatButtonModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatListModule,
        MatAutocompleteModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        TranslateModule.forChild(),
        ColorPickerModule,
        ConfirmDialogModule,
        FlexLayoutModule,
        MatSortModule,
        ItemStoreModule,
        FieldsStoreModule,
        MatSidenavModule,
        DefaultPageModule,
        TypeSelectorModule,
        TypeNameModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(itemsRoutes)
    ],
    providers: [ItemsListResolver]
})
export class ItemsModule {}
