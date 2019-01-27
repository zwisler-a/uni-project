import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPipe } from './_company-store/company.pipe';
import { CompanyListComponent } from './company-list/company-list.component';
import { RouterModule } from '@angular/router';
import { companyRoutes } from './routes';
import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { MatListModule } from '@angular/material';

@NgModule({
    declarations: [CompanyListComponent],
    imports: [CommonModule, RouterModule.forChild(companyRoutes), DefaultPageModule, MatListModule],
    exports: []
})
export class CompanyModule {}
