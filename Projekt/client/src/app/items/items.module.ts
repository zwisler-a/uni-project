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
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';

import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDetailResolver } from './item-details/item-details.resolver';
import { ItemFieldBoolComponent } from './item-field/item-field-bool/item-field-bool.component';
import { ItemFieldColorComponent } from './item-field/item-field-color/item-field-color.component';
import { ItemFieldDateComponent } from './item-field/item-field-date/item-field-date.component';
import { ItemFieldFileComponent } from './item-field/item-field-file/item-field-file.component';
import { ItemFieldNumberComponent } from './item-field/item-field-number/item-field-number.component';
import { ItemFieldReferenceComponent } from './item-field/item-field-reference/item-field-reference.component';
import { ItemFieldStringComponent } from './item-field/item-field-string/item-field-string.component';
import { ItemFieldComponent } from './item-field/item-field.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { ItemTransformationService } from './item-transformation.service';
import { ItemTypeListComponent } from './item-type-list/item-type-list.component';
import { ItemService } from './item.service';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListResolver } from './items-list/items-list.resolver';
import { itemsRoutes } from './items.routes';
import { SidenavOverlayComponent } from './sidenav-overlay/sidenav-overlay.component';
import { SearchModule } from '../search/search.module';

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
        MatDatepickerModule,
        MatNativeDateModule,
        TranslateModule.forChild(),
        ColorPickerModule,
        ConfirmDialogModule,
        FlexLayoutModule,
        MatSortModule,
        SearchModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(itemsRoutes)
    ],
    providers: [ItemService, ItemDetailResolver, ItemsListResolver, ItemTransformationService]
})
export class ItemsModule {}
