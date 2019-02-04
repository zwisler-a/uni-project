import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storable } from 'src/app/shared/store/storable.interface';
import { StoreFactoryService } from 'src/app/shared/store/store-factory.service';
import { Store } from 'src/app/shared/store/store.class';
import { environment } from 'src/environments/environment';

import { Type } from '../../models/type.interface';

/**
 * This service is used for all type related backend actions.
 * It uses the {@link Store} to store its data an handle backend requests
 */
@Injectable({
    providedIn: 'root'
})
export class TypesService {
    _store: Store<Type>;

    get types() {
        return this._store.store;
    }

    constructor(private storeFactory: StoreFactoryService) {
        // Initialize store
        this._store = this.storeFactory.create<Type>({
            baseUrl: environment.baseUrl + '/types',
            errorKeyBase: 'types.'
        });
    }

    /**
     * Triggers the loading process of types. If there is still valid data in the store nothing is fetched from the backend.
     * If there is still valid data the returned observable completes instantly with the current store value.
     */
    loadTypes() {
        return this._store.load();
    }

    /**
     * Tries to find the type inside the store. If not found, sends a request to the backend.
     * The returned Observable is dependend on the stored Types. So once the types store updates, so does this observable.
     * @param id id of the type
     */
    getType(id: number): Observable<Type> {
        return this._store.byId(id);
    }

    /**
     * Sends a request to the api to create a new type and adds it to the store if it succeeds.
     * @param type Type to create
     */
    createType(type: Type): Observable<Type> {
        return this._store.create(this.transformType(type));
    }
    /**
     * Sends a delete request to the api and updates the store if it succeeds
     * @param id TypeId of the type to delete
     */
    deleteType(type: Storable): Observable<void> {
        return this._store.delete(type);
    }

    /**
     * Sends a patch request to the api and updated the type in the store in success
     * @param type Modified Type
     */
    updateType(type: Type): Observable<Type> {
        return this._store.update(this.transformType(type));
    }

    /** Transforms a type into a valid form for the backend */
    private transformType(type: Type) {
        const fields = type.fields.map(field => {
            const transformField: any = {
                name: field.name,
                type: field.type,
                unique: field.unique,
                required: field.required
            };
            if (field.referenceId) {
                transformField.referenceId = field.referenceId;
            }
            if (field.id) {
                transformField.id = field.id;
            }
            return transformField;
        });
        return { id: type.id, name: type.name, fields: fields };
    }
}
