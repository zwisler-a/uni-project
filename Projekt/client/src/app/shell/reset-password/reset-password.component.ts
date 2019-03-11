import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    baseUrl = environment.baseUrl + '/passwordReset';
    // usused
    loading = false;
    // unused
    link = '';
    // unused
    linkName = '';

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private translate: TranslateService,
        private router: Router,
        private snackbar: MatSnackBar
    ) {
        this.resetForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]]
        });
    }

    ngOnInit() {}

    /**
     * Sends the provided email to the backend to the backend.
     * The user gets no information, if his email is valid for security reasons.
     */
    requestResetLink() {
        const body = this.resetForm.getRawValue();
        body.baseURL = window.location.href;

        this.http.post(this.baseUrl, body, {}).subscribe(
            () => {
                // TODO: translation
                this.snackbar.open('A reset link has been send to ' + body['email'], '', {
                    horizontalPosition: 'center',
                    panelClass: 'success'
                });
                this.resetForm.disable();
                // TODO translae
                this.resetForm.get('email').setValue('An email has been sent! :)');
            },
            () => {
                // TODO: translation
                this.snackbar.open(body['email'] + ' is not a known address!', '', {
                    horizontalPosition: 'center'
                });
                this.resetForm.get('email').setValue('');
            }
        );
    }
}
