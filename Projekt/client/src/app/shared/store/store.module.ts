import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { StoreFactoryService } from './store-factory.service';

@NgModule({
    imports: [CommonModule, MatSnackBarModule, TranslateModule],
    providers: [StoreFactoryService]
})
export class StoreModule {}
