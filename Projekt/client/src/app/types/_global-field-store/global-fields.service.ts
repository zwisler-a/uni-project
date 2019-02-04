import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeField } from 'src/app/models/type-field.interface';
import { StoreFactoryService } from 'src/app/shared/store/store-factory.service';
import { Store } from 'src/app/shared/store/store.class';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GlobalFieldsService {
    /** All global fields */
    get fields(): Observable<TypeField[]> {
        return this._store.store;
    }
    private _store: Store<TypeField>;

    constructor(private storeFactory: StoreFactoryService) {
        // Configure store
        this._store = this.storeFactory.create<TypeField>({
            baseUrl: environment.baseUrl + `/globals`,
            errorKeyBase: 'globals.'
        });
    }

    /** Loads the global fields if necessary */
    loadFields() {
        return this._store.load();
    }

    /** Updates a global field */
    updateField(field: TypeField): any {
        return this._store.update(field);
    }

    /** Deletes a global field */
    deleteField(id: number): any {
        return this._store.delete({ id });
    }

    /** Creates a new global field */
    createField(field: TypeField): any {
        return this._store.create(field);
    }
}
