import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {$TAB} from 'codelyzer/angular/styles/chars';

/** Contains a login form for user authentication */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    laoding = false;
    userDemoInfo: MatSnackBarRef<any>;

    constructor(
        private fromBuilder: FormBuilder,
        private authService: AuthService,
        private translate: TranslateService,
        private router: Router,
        private snackbar: MatSnackBar
    ) {
        this.loginForm = this.fromBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    ngOnInit() {
        setTimeout(() => {
            if (environment.showLoginDemoInfo) {
                this.userDemoInfo = this.snackbar.open(
                    'Demo Username: "username", password: "password"'
                );
            }
            if (this.authService.jwt) {
                this.router.navigate(['/']);
            }
        });
    }
    ngOnDestroy(): void {
        if (environment.showLoginDemoInfo) {
            this.userDemoInfo.dismissWithAction();
        }
    }

    /** triggers the login process */
    login() {
        const { username, password, rememberMe } = this.loginForm.getRawValue();
        this.laoding = true;
        this.authService.login(username, password, rememberMe).subscribe(
            () => {
                this.laoding = false;
            },
            () => {
                // Give feedback to the user via snackbar
                this.laoding = false;
                this.translate
                    .get('login.invalid-login')
                    .subscribe(translation => {
                        this.snackbar.open(translation, null, {
                            duration: 2000,
                            horizontalPosition: 'end'
                        });
                    });
            }
        );
    }

    /** triggers the password recovery*/
    resetPassword() {
        window.open('/reset');
    }
}
