import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private router: Router,
        private snackbar: MatSnackBar
    ) {

        // this.changePasswordForm = this.formBuilder.group({
        //     newPassword: ['', Validators.required],
        //     confirmedPw: ['', ]
        // }, );
    }

    ngOnInit() {
        this.setup();
    }

    private setup() {
        const newPassword = new FormControl('', [Validators.required/*, this.passwordValidator()*/]);
        const confirmedPw = new FormControl('', [Validators.required, this.matchValidator(newPassword)]);
        this.changePasswordForm = new FormGroup({
            newPassword,
            confirmedPw
        });
    }

    doSomething() {
        const id = this.route.snapshot.params['id'];
        const token = this.route.snapshot.params['token'];

        this.setup();
        console.log(id);
        console.log(token);
        const input = this.changePasswordForm.getRawValue();
        const body = {
            id: id,
            token: token,
            newPassword: input.username
        };

        console.log(body);

    }

    private matchValidator(matchControl: FormControl): ValidatorFn {
        return (control: FormControl) => {
            if (control.value === matchControl.value) {
                return null;
            } else {
                return {missmatch: true};
            }
        };
    }

    private passwordValidator(): ValidatorFn {
        return (control: FormControl) => {
            const pw: string = control.value;
            const checks = {
                length: !(pw.length > 8),
                uppercase: !/[A-Z]/.test(pw),
                lowercase: !/[a-z]/.test(pw),
                number: !/[0-9]/.test(pw),
                specialChar: !/[!@#§$%^&*(),.?":{}|<>]/.test(pw)
            };
            if (checks.length || checks.uppercase || checks.lowercase || checks.number || checks.specialChar) {
                return {invalidPassword: checks};
            } else {
                return null;
            }
        };
    }
}
