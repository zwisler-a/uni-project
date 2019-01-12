import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCardModule,
    MatAutocompleteModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../shell/auth/auth.module';
import { FieldsService } from './fields.service';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDetailResolver } from './item-details/item-details.resolver';
import { ItemFieldBoolComponent } from './item-field/item-field-bool/item-field-bool.component';
import { ItemFieldColorComponent } from './item-field/item-field-color/item-field-color.component';
import { ItemFieldFileComponent } from './item-field/item-field-file/item-field-file.component';
import { ItemFieldReferenceComponent } from './item-field/item-field-reference/item-field-reference.component';
import { ItemFieldNumberComponent } from './item-field/item-field-number/item-field-number.component';
import { ItemFieldStringComponent } from './item-field/item-field-string/item-field-string.component';
import { ItemFieldComponent } from './item-field/item-field.component';
import { ItemService } from './item.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListResolver } from './items-list/items-list.resolver';
import { itemsRoutes } from './items.routes';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { ItemPageComponent } from './item-page/item-page.component';
import { ItemTransformationService } from './item-transformation.service';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemTypeListComponent } from './item-type-list/item-type-list.component';
import { SidenavOverlayComponent } from './sidenav-overlay/sidenav-overlay.component';

@NgModule({
    declarations: [
        ItemsListComponent,
        ItemDetailsComponent,
        ItemFieldComponent,
        ItemFieldStringComponent,
        ItemFieldNumberComponent,
        ItemFieldColorComponent,
        ItemFieldFileComponent,
        ItemFieldBoolComponent,
        ItemFieldReferenceComponent,
        ItemPageComponent,
        AddItemComponent,
        ItemTypeListComponent,
        SidenavOverlayComponent
    ],
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatTableModule,
        MatProgressBarModule,
        MatInputModule,
        MatSidenavModule,
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
        TranslateModule.forChild(),
        ColorPickerModule,
        ConfirmDialogModule,
        FlexLayoutModule,
        MatSortModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(itemsRoutes)
    ],
    providers: [ItemService, FieldsService, ItemDetailResolver, ItemsListResolver, ItemTransformationService]
})
export class ItemsModule {}
