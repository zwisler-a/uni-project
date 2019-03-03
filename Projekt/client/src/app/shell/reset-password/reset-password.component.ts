import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, MatFormField} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    loading = false;
    baseUrl = environment.baseUrl + '/passwordReset';
    link = '';
    linkName = '';

    constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private translate: TranslateService,
                private router: Router,
                private snackbar: MatSnackBar) {
        this.resetForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]]
        });
    }

    ngOnInit() {
    }


    /**
     * Sends the provided email to the backend to the backend.
     * The user gets no information, if his email is valid for security reasons.
     * TODO remove the resetLink which we are only getting for now, as long as no email service is implemented
     */
    requestResetLink() {
        const body = this.resetForm.getRawValue();
        this.http.post(this.baseUrl, body, {}).subscribe(data => {
            console.log(data);
            this.link = data['resetLink'];
            this.linkName = 'link';
        });
        this.snackbar.open('A reset link has been send to ' + body['email'], '', {
            duration: 20000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
        // this.resetForm.reset();
        // this.resetForm.disable();
    }
}
