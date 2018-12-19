import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from './user.interface';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

/**
 * A service which handles user authentication.
 * Also contains the user information stored in the jwt
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    static readonly LOCALSTROAGE_KEY = 'auth_jwt';
    readonly authenticateUrl = [environment.apiBase, 'authenticate'].join('/');

    private _user: User;
    private _jwt: string;

    /** Will throw if invalid */
    set jwt(val) {
        this._user = jwt_decode(val);
        this._jwt = val;
    }

    constructor(private http: HttpClient, private router: Router) {
        // if there is already a jwt use that, if not show login
        const stroageJWT = localStorage.getItem(AuthService.LOCALSTROAGE_KEY);
        if (stroageJWT) {
            try {
                this.jwt = stroageJWT;
            } catch (e) {
                console.log('Error while retireving stored jwt');
            }
        } else {
            this.router.navigate(['/auth/login']);
        }
    }

    /**
     * Tries to authenticate the user with the backend.
     * Redirects on success
     * @param username Username of the user
     * @param password Password of the user
     * @param rememberMe if the jwt should be stored in case of successfull login
     * @param redirectRoute In case after successfull login the user should be routed somwhere special set this
     */
    authenticate(
        username: string,
        password: string,
        rememberMe = false,
        redirectRoute: string[] = ['/']
    ) {
        return (
            this.http
                .post(this.authenticateUrl, { username, password })
                // convert to promise because chaining is easier
                .pipe(
                    map((res: string) => {
                        this.jwt = res;
                        if (rememberMe) {
                            localStorage.setItem(
                                AuthService.LOCALSTROAGE_KEY,
                                this.jwt
                            );
                        }
                        this.router.navigate(redirectRoute);
                    })
                )
        );
    }

    /** Removes JWT and logs out the user */
    logout() {
        localStorage.removeItem(AuthService.LOCALSTROAGE_KEY);
        this._jwt = null;
        this._user = null;
    }

    get jwt() {
        return this._jwt;
    }

    get user() {
        return this._user;
    }
}
