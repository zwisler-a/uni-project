import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

/** Contains a login form for user authentication */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private fromBuilder: FormBuilder,
        private authService: AuthService
    ) {
        this.loginForm = this.fromBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    ngOnInit() {}

    /** triggers the login process */
    login() {
        const { username, password, rememberMe } = this.loginForm.getRawValue();
        this.authService.authenticate(username, password, rememberMe).subscribe();
    }
}
