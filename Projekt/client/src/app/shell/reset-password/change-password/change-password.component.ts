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
    private antwort;


    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private router: Router,
        private snackbar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.tokenValidation();
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

    async doSomething() {

        let password;


        if (this.changePasswordForm.valid && this.changePasswordForm.dirty) {
            password = this.changePasswordForm.get('newPassword').value;
            console.log(password);
        }

        const input = this.changePasswordForm;

        console.log(input);
        console.log(password);

    }

    tokenValidation() {
        this.id = this.route.snapshot.params['id'];
        this.token = this.route.snapshot.params['token'];
        const body = {
            id: this.id,
            token: this.token,
        };


        this.http.post(this.baseUrl + '/validate', body).subscribe(data => {
            this.antwort = data['text'];
            console.log(data);
            console.log(this.antwort);
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
