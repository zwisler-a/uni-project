import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole, Role } from 'src/app/models/role.interface';
import { StoreFactoryService } from 'src/app/shared/store/store-factory.service';
import { Store } from 'src/app/shared/store/store.class';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shell/auth/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private _store: Store<any>;

    get roles() {
        return this._store.store;
    }

    constructor(private storeFactory: StoreFactoryService, private authService: AuthService) {
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

    getRole(id: number) {
        return this._store.byId(id);
    }

    /** Creates a new role */
    createRole(role: IRole) {
        return this._store.create(role);
    }

    /** Deletes a role */
    deleteRole(id: number) {
        return this._store.delete({ id }).pipe(
            tap(() => {
                return this.authService.reauthenticate().subscribe();
            })
        );
    }

    /** Updates a role */
    updateRole(role: Role) {
        return this._store.update(role).pipe(
            tap(() => {
                return this.authService.reauthenticate().subscribe();
            })
        );
    }
}
