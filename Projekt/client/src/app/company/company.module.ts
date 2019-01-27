import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { companyRoutes } from './routes';

@NgModule({
    declarations: [CompanyListComponent],
    imports: [CommonModule, RouterModule.forChild(companyRoutes), DefaultPageModule, MatListModule],
    exports: []
})
export class CompanyModule {}
