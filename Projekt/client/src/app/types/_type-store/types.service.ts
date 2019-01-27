import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Type } from '../../models/type.interface';
import { TypeErrorService } from './type-error.service';

@Injectable({
    providedIn: 'root'
})
export class TypesService {
    baseUrl = `${environment.baseUrl}/types`;

    private _types = new BehaviorSubject<Type[]>([]);
    /** Stores all types */
    readonly types = this._types.asObservable();

    constructor(private http: HttpClient, private errorService: TypeErrorService) {}

    /** load all item types from the api. Only loads types once */
    loadTypes(): Observable<BehaviorSubject<Type[]>> {
        if (this._types.getValue().length) {
            return of(this._types);
        }
        return this.http.get<Type[]>(this.baseUrl).pipe(
            map(res => {
                this._types.next(res);
                return this._types;
            }),
            this.errorService.getError()
        );
    }

    /**
     * Retrieve a single type. First tries to look up the already loaded types, if not found retrieves it from the api.
     * The type gets updated once the types update.
     * @param id id of the type
     */
    getType(id: number): Observable<Type> {
        return this.types.pipe(
            flatMap(types => {
                const storedType = types.find(type => type.id + '' === id + '');
                if (!storedType) {
                    return this.http.get([this.baseUrl, id].join('/')).pipe(this.rxjsStoreAddUpdate());
                }
                return of(storedType);
            }),
            this.errorService.getError()
        );
    }

    /**
     * Sends a request to the api to create a new type and adds it to the store if it succeeds.
     * @param type Type to create
     */
    createType(type: Type): Observable<Type> {
        return this.http.post<Type>(this.baseUrl, this.transformType(type)).pipe(
            this.rxjsStoreAddUpdate(),
            this.errorService.createError()
        );
    }
    /** Ads a new type to the store */
    private rxjsStoreAddUpdate() {
        return this.updateStore((types, res) => {
            types.push(res);
            return types;
        });
    }

    /**
     * Sends a delete request to the api and updates the store if it succeeds
     * @param id TypeId of the type to delete
     */
    deleteType(id: number): Observable<void> {
        return this.http.delete([this.baseUrl, id].join('/')).pipe(
            this.rxjsStoreDeleteUpdate(id),
            this.errorService.deleteError()
        );
    }
    /** removed a type from the store */
    private rxjsStoreDeleteUpdate(id) {
        return this.updateStore((types, res) => {
            return types.filter(type => type.id + '' !== id + '');
        });
    }

    /**
     * Sends a patch request to the api and updated the type in the store in success
     * @param type Modified Type
     */
    updateType(type: Type): Observable<Type> {
        return this.http.patch<Type>([this.baseUrl, type.id].join('/'), this.transformType(type)).pipe(
            this.rxjsStoreUpdate(type.id),
            this.errorService.updateError()
        );
    }
    /** update the store */
    private rxjsStoreUpdate(id) {
        return this.updateStore((types, res) => {
            return types.map(type => (type.id + '' === id + '' ? res : type));
        });
    }

    /** helper to create an rxjs operator for the store */
    private updateStore(update: (types: Type[], res: any) => Type[]) {
        return map((res: Type) => {
            const types = this._types.getValue();
            this._types.next(update(types, res));
            return res;
        });
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
