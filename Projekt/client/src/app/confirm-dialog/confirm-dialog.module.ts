import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ConfirmDialogService } from './confirm-dialog.service';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * Module for a simple, reusable confirm dialog to make sure certain actions can not be taken accidentally
 */
@NgModule({
    declarations: [ConfirmDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        TranslateModule,
        FlexLayoutModule
    ],
    entryComponents: [ConfirmDialogComponent],
    providers: [ConfirmDialogService]
})
export class ConfirmDialogModule {}
