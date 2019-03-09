import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from 'src/app/company/_company-store/company.service';
import { Company } from 'src/app/models/company.interface';
import { StoreFactoryService } from 'src/app/shared/store/store-factory.service';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.interface';
import { PermissionService } from 'src/app/permission/permission.service';
import { Permission } from 'src/app/models/permission.enum';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-company-selector',
    templateUrl: './company-selector.component.html',
    styleUrls: ['./company-selector.component.scss']
})
export class CompanySelectorComponent implements OnInit, OnDestroy {
    permissionSub: Subscription;

    get companies() {
        return this.companyStore.companies;
    }

    constructor(
        private companyStore: CompanyService,
        private authService: AuthService,
        private permission: PermissionService,
        private storeFactory: StoreFactoryService
    ) {}

    ngOnInit() {
        this.permissionSub = this.permission.hasPermission(Permission.GLOBAL_ADMIN).subscribe(hasPermission => {
            if (hasPermission) {
                this.companyStore.loadCompanies().subscribe();
            }
        });
    }
    ngOnDestroy(): void {
        if (this.permissionSub) {
            this.permissionSub.unsubscribe();
        }
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
