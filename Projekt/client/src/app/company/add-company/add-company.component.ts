import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../_company-store/company.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-add-company',
    templateUrl: './add-company.component.html',
    styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
    newCompany: string;

    constructor(private companyService: CompanyService, private location: Location) {}

    ngOnInit() {}

    createCompany() {
        this.companyService.createCompany(this.newCompany).subscribe(() => {
            this.newCompany = '';
            this.location.back();
        });
    }
}
