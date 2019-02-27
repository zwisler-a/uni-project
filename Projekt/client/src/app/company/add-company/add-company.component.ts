import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CompanyService } from '../_company-store/company.service';

/** UI to add a new Company */
@Component({
    selector: 'app-add-company',
    templateUrl: './add-company.component.html',
    styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
    /** Neccessary info for createing a company */
    form: FormGroup;

    constructor(private companyService: CompanyService, private location: Location, private fb: FormBuilder) {}

    ngOnInit() {
        // Initialize form group
        this.form = this.fb.group({
            newCompany: ['', Validators.required]
        });
    }

    /** Creates a new company */
    createCompany() {
        const company = this.form.getRawValue().newCompany;
        this.companyService.createCompany(company).subscribe(() => {
            this.form.reset();
            this.location.back();
        });
    }
}
