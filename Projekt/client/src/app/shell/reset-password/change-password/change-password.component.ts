import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
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
    baseUrl = environment.baseUrl + '/passwordReset';
    private id: number;
    private token: string;
    public information1: string;
    public information2: string;
    private tokenIsValid = false;


    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private translate: TranslateService,
        public snackbar: MatSnackBar,
    ) {
    }

    ngOnInit() {
        this.information1 = 'Your reset link is invalid or has expired.';
        this.information2 = 'Please repeat the process or contact your administrator.';
        this.tokenValidation();
        this.setup();
    }

    private setup() {
        const newPassword = new FormControl('', [Validators.required, this.passwordValidator()]);
        const confirmedPw = new FormControl('', [Validators.required, this.matchValidator(newPassword)]);
        this.changePasswordForm = new FormGroup({
            newPassword,
            confirmedPw
        });
    }

    /**
     *  Sends the new password to the backend to change it there.
     */
    async changePassword() {
        await this.tokenValidation();
        if (this.tokenIsValid) {
            let password1;
            let password2;
            if (this.changePasswordForm.valid && this.changePasswordForm.dirty && this.tokenIsValid) {
                password1 = this.changePasswordForm.get('newPassword').value;
                password2 = this.changePasswordForm.get('confirmedPw').value;
            }
            const body = {
                id: this.id,
                token: this.token,
                pass1: password1,
                pass2: password2
            };

            this.http.post(this.baseUrl + '/reset', body).subscribe();
        } else {
            this.invalidTokenSnackbar();
        }
    }

    /**
     * Asks the backend, whether the token is still valid or not.
     */
    tokenValidation() {
        this.id = this.route.snapshot.params['id'];
        this.token = this.route.snapshot.params['token'];
        const body = {
            id: this.id,
            token: this.token,
        };
        this.http.post(this.baseUrl + '/validate', body).subscribe(data => {

            if (data['success'] === true) {
                this.tokenIsValid = true;
                this.information1 = 'Hello ' + data['username'] + '!';
                this.information2 = 'Please enter your new password.';
            } else {
                this.invalidTokenSnackbar();
                this.changePasswordForm.get('newPassword').disable();
                this.changePasswordForm.get('newPassword').setValue('Your link has expired.');
                this.changePasswordForm.get('confirmedPw').disable();
                this.changePasswordForm.get('confirmedPw').setValue('Your link has expired!');
            }
        });
    }

    /**
     * opens a popup to let the user know his reset link is not valid
     */

    private invalidTokenSnackbar() {
        this.snackbar.open('Your reset link is invalid or has expired', 'OK', {
            duration: 20000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }


    private matchValidator(matchControl: FormControl): ValidatorFn {
        return (control: FormControl) => {
            if (control.value === matchControl.value) {
                return null;
            } else {
                return {mismatch: true};
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
