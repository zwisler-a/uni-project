import { Component, Host, OnInit, Optional } from '@angular/core';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';
import { combineLatest, Observable } from 'rxjs';
import { Company } from 'src/app/models/company.interface';
import { CompanyService } from '../_company-store/company.service';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
    companies: Observable<Company[]>;

    constructor(
        @Optional() @Host() private defaultPage: DefaultPageComponent,
        private companyService: CompanyService,
        private confirm: ConfirmDialogService,
        private router: Router
    ) {}

    ngOnInit() {
        this.companyService.loadCompanies().subscribe();
        if (!this.defaultPage) {
            return;
        }
        this.defaultPage.title = 'company.title';
        this.companies = combineLatest(this.defaultPage.search, this.companyService.companies, (query, company) => {
            return company.filter(role => role.name.includes(query));
        });

        this.defaultPage.actions.next([
            {
                click: () => {
                    this.router.navigate(['/companies', 'view', { outlets: { detail: 'add' } }]);
                },
                icon: 'add',
                tooltip: 'add'
            }
        ]);
    }

    deleteCompany(id: number) {
        this.confirm.open('company.delete', true).subscribe(() => {
            this.companyService.deleteCompany(id).subscribe();
        });
    }
}
