import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRole, Role } from 'src/app/models/role.interface';
import { StoreFactoryService } from 'src/app/shared/store/store-factory.service';
import { environment } from 'src/environments/environment';
import { Store } from 'src/app/shared/store/store.class';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private _store: Store<any>;

    get roles() {
        return this._store.store;
    }

    constructor(private http: HttpClient, private storeFactory: StoreFactoryService) {
        // Initialize store
        this._store = this.storeFactory.create<Role>({
            baseUrl: `${environment.baseUrl}/roles`,
            errorKeyBase: 'role.'
        });
    }

    /** Loads all roles from the backend */
    loadRoles() {
        return this._store.load();
    }

    /** Creates a new role */
    createRole(role: IRole) {
        return this._store.create(Role.toBackendForm(role));
    }

    /** Deletes a role */
    deleteRole(id: number) {
        return this._store.delete({ id });
    }

    /** Updates a role */
    updateRole(role: Role) {
        return this._store.update(Role.toBackendForm(role));
    }
}
