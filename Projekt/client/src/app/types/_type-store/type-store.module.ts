import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { TypeErrorService } from './type-error.service';
import { TypesService } from './types.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, MatSnackBarModule, TranslateModule],
    providers: [TypesService, TypeErrorService]
})
export class TypeStoreModule {}
