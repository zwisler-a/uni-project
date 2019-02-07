import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';
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

    constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private translate: TranslateService,
                private router: Router,
                private snackbar: MatSnackBar) {
        this.resetForm = this.formBuilder.group({
            email: ['', Validators.email]
        });
    }

    ngOnInit() {
    }

    requestResetLink() {
        const body = this.resetForm.getRawValue();

        console.log('aus dem eingabefeld: ' + body.email);
        console.log('baseurl: ' + this.baseUrl);
        this.http.post(this.baseUrl, body, {}).subscribe(data => {
            console.log(data['resetLink'] + ' ist sent to ' + body.email);
        });

    }
}
