import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    loading = false;
    baseUrl = environment.baseUrl + '/passwordReset' ;

    constructor(private fromBuilder: FormBuilder,
                private http: HttpClient,
                private authService: AuthService,
                private translate: TranslateService,
                private router: Router,
                private snackbar: MatSnackBar) {
        this.resetForm = this.fromBuilder.group({
            email: ['', Validators.email]
        });
    }

    ngOnInit() {
    }

    sendResetLink() {
        const {email} = this.resetForm.getRawValue();

        // window.alert('xxx: ' + email);
        console.log(email);
        console.log(this.baseUrl);
        // window.alert(this.baseUrl);
        // window.alert(this.http.get(`${this.baseUrl}/${user}/${userId}` ));
        const data = this.http.post(this.baseUrl, {'email': 'penis'}, {});
        console.log(data);

    }
}
