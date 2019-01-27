import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment.prod';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly baseUrl = environment.baseUrl + '/users';

    private _users = new BehaviorSubject<User[]>([]);
    readonly users = this._users.asObservable();

    constructor(private http: HttpClient, private snackbar: MatSnackBar, private translate: TranslateService) {}

    /**
     * Fetch all users form the backend
     */
    loadUsers() {
        return this.http.get(this.baseUrl).pipe(
            map((res: User[]) => {
                this._users.next(res);
                return res;
            }),
            catchError(err => {
                this.snackbar.open(this.translate.instant('user.error.load'));
                return throwError(err);
            })
        );
    }

    /**
     * Gets a single user. Tries store first then fallback to backend call
     * @param id id of user
     */
    getUser(id: string): any {
        return this.users.pipe(
            map(users => {
                return users.find(user => user.id + '' === id + '');
            }),
            catchError(err => {
                this.snackbar.open(this.translate.instant('user.error.get'));
                return throwError(err);
            })
        );
    }

    /**
     * Delete a user
     * @param id id of the user
     */
    deleteUser(id: string | number) {
        return this.http.delete(this.baseUrl + '/' + id).pipe(
            tap(_ => {
                const users = this._users.getValue();
                const newUsers = users.filter(user => user.id + '' === id + '');
                this._users.next(newUsers);
            }),
            catchError(err => {
                this.snackbar.open(this.translate.instant('user.error.delete'));
                return throwError(err);
            })
        );
    }

    /**
     * Updates a user (id in Userobject must be correct)
     * @param user Changed user
     */
    updateUser(user: User) {
        return this.http.patch(this.baseUrl + '/' + user.id, user).pipe(
            tap((changed: User) => {
                const users = this._users.getValue();
                const newUsers = users.filter(filterUser => filterUser.id + '' === user.id + '');
                newUsers.push(changed);
                this._users.next(newUsers);
            }),
            catchError(err => {
                this.snackbar.open(this.translate.instant('user.error.update'));
                return throwError(err);
            })
        );
    }
}
