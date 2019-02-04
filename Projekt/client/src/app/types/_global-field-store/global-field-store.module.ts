import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFieldsService } from './global-fields.service';
import { MatSnackBarModule } from '@angular/material';
import { StoreModule } from 'src/app/shared/store/store.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, StoreModule],
    providers: [GlobalFieldsService]
})
export class GlobalFieldStoreModule {}
