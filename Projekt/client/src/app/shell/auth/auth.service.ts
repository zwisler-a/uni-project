import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthenticateResponse } from './authenticate.response';
import { User } from './user.interface';

/**
 * A service which handles user authentication.
 * Also contains the user information stored in the jwt
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    static readonly LOCALSTROAGE_KEY = 'auth_jwt';
    readonly LOGIN_URL = ['/auth/login'];
    readonly authenticateUrl = [environment.baseUrl, 'authenticate'].join('/');

    private _user: User;
    private _jwt: string;
    private _longLivedJwt: string;

    private _authChange = new Subject();
    readonly authChange = this._authChange.asObservable();

    /** Will throw if invalid */
    set jwt(val) {
        this._user = jwt_decode(val);
        this._jwt = val;
    }

    constructor(private http: HttpClient, private router: Router) {}

    /**
     * Tries to authenticate the user with the backend.
     * Redirects on success
     * @param name Username of the user
     * @param password Password of the user
     * @param rememberMe if the jwt should be stored in case of successfull login
     * @param redirectRoute In case after successfull login the user should be routed somwhere special set this
     */
    login(name: string, password: string, rememberMe = false, redirectRoute: string[] = ['/']) {
        return this.http.post(this.authenticateUrl, { name, password }).pipe(
            map((res: AuthenticateResponse) => {
                this.jwt = res.short;
                this._longLivedJwt = res.long;
                if (rememberMe) {
                    localStorage.setItem(AuthService.LOCALSTROAGE_KEY, this._longLivedJwt);
                }
                this._authChange.next();
                this.router.navigate(redirectRoute);
            })
        );
    }

    /**
     *Tries to fetch a new short lived token from the backend.
     * @param longLivedToken Long lived token to authentivate with on the server. Use the one in localStorage if not given
     */
    reauthenticate(longLivedToken?: string): Observable<boolean> {
        if (!longLivedToken) {
            longLivedToken = localStorage.getItem(AuthService.LOCALSTROAGE_KEY);
            if (!longLivedToken) {
                return throwError('no stored token');
            }
        }
        return this.http.patch(this.authenticateUrl, { token: longLivedToken }).pipe(
            map((res: AuthenticateResponse) => {
                this.jwt = res.short;
                this._authChange.next();
                return true;
            })
        );
    }

    /**
     * Checks if the jwt is still valid
     */
    authenticate() {
        const result = new Subject();
        this.http.get(this.authenticateUrl).subscribe(
            () => {
                result.next();
                this._authChange.next();
                result.complete();
            },
            () => {
                result.error(null);
            }
        );
        return result;
    }

    /** Removes JWT and logs out the user */
    logout() {
        localStorage.removeItem(AuthService.LOCALSTROAGE_KEY);
        this._jwt = null;
        this._user = null;
        this._authChange.next();
        this.router.navigate(this.LOGIN_URL);
    }

    get jwt() {
        return this._jwt;
    }

    get user() {
        return this._user;
    }
}
