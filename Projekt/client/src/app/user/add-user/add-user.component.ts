import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_user-store/user.service';
import { User } from 'src/app/models/user.interface';
import { Company } from 'src/app/models/company.interface';
import { CompanyService } from 'src/app/company/_company-store/company.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    form: FormGroup;

    get companies() {
        return this.companyService.companies;
    }

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private companyService: CompanyService,
        private translate: TranslateService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit() {
        this.companyService.loadCompanies().subscribe();
        this.form = this.fb.group({
            name: ['', Validators.required],
            password: [''],
            email: ['', Validators.email],
            companyId: [0, Validators.required]
        });
        this.form.get('password').disable();
    }

    createUser() {
        this.form.get('password').setValue(
            'New1!' +
                Math.random()
                    .toString(36)
                    .slice(-8)
        );
        const user: User = this.form.getRawValue();
        this.userService.createUser(user).subscribe(() => {
            this.textToClipboard(this.form.get('password').value);
            const text = this.translate.instant('user.new.created');
            this.snackbar.open(text, null, { duration: 2000, panelClass: 'success' });
        });
    }

    private textToClipboard(text) {
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    }

    selectCompany(companyId: number) {
        this.form.get('companyId').setValue(companyId);
    }

    toName(comp: Company) {
        return comp.name;
    }
}
