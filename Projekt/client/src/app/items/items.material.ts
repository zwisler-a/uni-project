import { NgModule } from '@angular/core';
import {
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';

const material = [
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
    MatChipsModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatSortModule,
    MatSidenavModule,
    MatNativeDateModule
];

@NgModule({
    imports: material,
    exports: material,
    providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500, horizontalPosition: 'end' } }]
})
export class ItemsMaterialModule {}
