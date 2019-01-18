import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

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
        private snackbar: MatSnackBar
    ) {
        this.loginForm = this.fromBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    ngOnInit() {
        if (environment.showLoginDemoInfo) {
            setTimeout(() => {
                this.userDemoInfo = this.snackbar.open(
                    'Demo Username: "username", password: "password"'
                );
            });
        }
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
        this.authService.authenticate(username, password, rememberMe).subscribe(
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
}
