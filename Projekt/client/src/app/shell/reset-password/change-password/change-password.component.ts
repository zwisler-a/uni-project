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
    baseUrl = environment.baseUrl + '/passwordReset';
    private id: number;
    private token: string;
    private test;
    private validToken = false;


    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private router: Router,
        public snackbar: MatSnackBar
    ) {
    }

    ngOnInit() {
        if (this.tokenValidation()) {
            console.log('2: token valid');
            this.test = 'boolean.true';
        } else {
            console.log('2: token invalid');
            this.test = ' \'boolean.false\' ';
        }
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

    async changePassword() {
        this.snackbar.open('hihihihi', null, {duration: 2000, horizontalPosition: 'end', panelClass: ['errorPanel']});

        let password1;
        let password2;


        if (this.changePasswordForm.valid && this.changePasswordForm.dirty) {
            password1 = this.changePasswordForm.get('newPassword').value;
            password2 = this.changePasswordForm.get('confirmedPw').value;
            console.log('p1: ' + password1);
            console.log('p2: ' + password2);
        }
        const body = {
            pass1: password1,
            pass2: password2
        };

        this.http.post(this.baseUrl + '/reset', body).subscribe();
    }

    tokenValidation() {
        this.id = this.route.snapshot.params['id'];
        this.token = this.route.snapshot.params['token'];
        const body = {
            id: this.id,
            token: this.token,
        };
        this.http.post(this.baseUrl + '/validate', body).subscribe(data => {


            if (data['success'] === true) {
                this.snackbar.open('Your reset link is fine, I love You', 'OK', {
                    duration: 20000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
                this.validToken = true;
                console.log('token valid');
                return true;
            } else {
                this.snackbar.open('Your reset link is invalid or expired', 'OK', {
                    duration: 20000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
                console.log('token invalid');
            }
        });
        return false;
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
