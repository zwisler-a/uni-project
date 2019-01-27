import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from 'src/app/models/role.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    baseUrl = `${environment.baseUrl}/types`;
    private _roles = new BehaviorSubject<Role[]>([]);
    readonly roles = this._roles.asObservable();

    constructor(private http: HttpClient) {}

    loadRoles() {
        return this.http.get<Role[]>(this.baseUrl).pipe(
            map(res => {
                this._roles.next(res);
                this._roles.next([{ id: 0, name: 'Test' }]);
                return this.roles;
            })
        );
    }
}
