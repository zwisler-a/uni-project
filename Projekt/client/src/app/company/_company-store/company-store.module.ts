import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPipe } from './company.pipe';
import { MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [CompanyPipe],
    imports: [CommonModule, MatSnackBarModule, TranslateModule],
    exports: [CompanyPipe]
})
export class CompanyStoreModule {}
