import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { StoreFactoryService } from 'src/app/shared/store/store-factory.service';
import { environment } from 'src/environments/environment.prod';
import { Store } from 'src/app/shared/store/store.class';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _store: Store<User>;

    get users() {
        return this._store.store;
    }

    constructor(private storeFactory: StoreFactoryService) {
        // Create a fitting store
        this._store = this.storeFactory.create<User>({
            baseUrl: environment.baseUrl + '/users',
            errorKeyBase: 'users.'
        });
    }

    /**
     * Fetch all users form the backend
     */
    loadUsers() {
        return this._store.load();
    }

    /**
     * Gets a single user. Tries store first then fallback to backend call
     * @param id id of user
     */
    getUser(id: number): any {
        return this._store.byId(id);
    }

    /**
     * Create a user
     * @param user user
     */
    createUser(user: User) {
        return this._store.create(user);
    }

    /**
     * Updates a user (id in Userobject must be correct)
     * @param user Changed user
     */
    updateUser(user: User) {
        return this._store.update(user);
    }

    /**
     * Delete a user
     * @param id id of the user
     */
    deleteUser(id: number) {
        return this._store.delete({ id });
    }
}
