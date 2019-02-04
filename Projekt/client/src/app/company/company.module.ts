import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';
import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { NavigateBackModule } from '../shared/navigate-back/navigate-back.module';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyResolver } from './_company-store/company.resolver';
import { companyRoutes } from './routes';

@NgModule({
    declarations: [CompanyListComponent, AddCompanyComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(companyRoutes),
        DefaultPageModule,
        MatListModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        NavigateBackModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        TranslateModule,
        MatInputModule
    ],
    exports: [],
    providers: []
})
export class CompanyModule {}
