import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { User } from 'src/app/shell/auth/user.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly baseUrl = environment.baseUrl + '/users';

    private _users = new BehaviorSubject<User[]>([]);
    readonly users = this._users.asObservable();

    constructor(private http: HttpClient) {}

    loadUsers() {
        return this.http.get(this.baseUrl).pipe(
            map((res: User[]) => {
                this._users.next(res);
                return res;
            })
        );
    }

    getUser(id: string): any {
        return this.users.pipe(
            map(users => {
                return users.find(user => user.id + '' === id + '');
            })
        );
    }

    deleteUser(id: string | number) {
        return this.http.delete(this.baseUrl + '/' + id).pipe(
            tap(_ => {
                const users = this._users.getValue();
                const newUsers = users.filter(user => user.id + '' === id + '');
                this._users.next(newUsers);
            })
        );
    }
}
