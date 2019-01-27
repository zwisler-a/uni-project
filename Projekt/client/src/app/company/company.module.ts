import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { companyRoutes } from './routes';
import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavigateBackModule } from '../shared/navigate-back/navigate-back.module';
import { FormsModule } from '@angular/forms';
import { CompanyResolver } from './company-list/company.resolver';

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
        FormsModule,
        ConfirmDialogModule,
        TranslateModule,
        MatInputModule
    ],
    exports: [],
    providers: [CompanyResolver]
})
export class CompanyModule {}
