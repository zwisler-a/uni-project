import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFieldsService } from './global-fields.service';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
    declarations: [],
    imports: [CommonModule, MatSnackBarModule],
    providers: [GlobalFieldsService]
})
export class GlobalFieldStoreModule {}
