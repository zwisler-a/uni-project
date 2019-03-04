import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/company/_company-store/company.service';
import { Company } from 'src/app/models/company.interface';
import { StoreFactoryService } from 'src/app/shared/store/store-factory.service';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.interface';

@Component({
    selector: 'app-company-selector',
    templateUrl: './company-selector.component.html',
    styleUrls: ['./company-selector.component.scss']
})
export class CompanySelectorComponent implements OnInit {
    get companies() {
        return this.companyStore.companies;
    }

    constructor(
        private companyStore: CompanyService,
        private authService: AuthService,
        private storeFactory: StoreFactoryService
    ) {}

    ngOnInit() {
        this.companyStore.loadCompanies().subscribe();
    }

    get currentCompany(): number {
        const user: User = this.authService.user;
        return user && user.companyId;
    }

    selectCompany(company: Company) {
        this.authService.user.companyId = company.id;
        this.storeFactory.forceReset();
    }
}
