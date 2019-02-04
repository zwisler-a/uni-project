import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of, OperatorFunction, throwError } from 'rxjs';
import { catchError, flatMap, tap } from 'rxjs/operators';

import { Storable } from './storable.interface';
import { StoreConfig } from './store-config.interface';

/**
 * An object of this class is responsible for handling CRUD actions with the backend.
 * It takes care of error handling (in a basic manner) and storing the entities put in in properly.
 * This class should be instanciated with the {@link StoreFactoryService}
 */
export class Store<T extends Storable> {
    private _store = new BehaviorSubject<T[]>([]);
    private lastUpdate = 0;
    store = this._store.asObservable();

    constructor(
        private httpClient: HttpClient,
        private translate: TranslateService,
        private snackbar: MatSnackBar,
        private config: StoreConfig
    ) {}

    /**
     * Returns observable which completes, once there is data in the store.
     */
    load(): Observable<T[]> {
        if (this.shouldReload()) {
            return this.loadFromBackend();
        } else {
            return of(this._store.getValue());
        }
    }

    /** Fetches all entities from the backend */
    private loadFromBackend() {
        return this.httpClient.get<T[]>(this.config.baseUrl + '/' + this.config.urls.getAll).pipe(
            tap(res => {
                this._store.next(res);
                this.lastUpdate = Date.now();
            }),
            this.catch(this.config.errorKeys.getAll)
        );
    }

    /**
     * Fetches a single Entity from the store. If its not found in the store it requests it from the backend
     * @param id Id of the Storable
     */
    byId(id: number) {
        return this.store.pipe(
            flatMap(entities => {
                const foundCompany = entities.find(entity => entity.id + '' === id + '');
                if (!foundCompany) {
                    return this.loadSingle(id);
                } else {
                    return of(foundCompany);
                }
            })
        );
    }

    /**
     * Fetches a single Entity from the backend
     * @param id Id of the Storable
     */
    private loadSingle(id: number) {
        return this.httpClient.get<T>(this.replaceQueryParams(this.config.baseUrl + '/' + this.config.urls.get, { id })).pipe(
            tap((res: T) => {
                const store = this._store.getValue();
                store.push(res);
                this._store.next(store);
            }),
            this.catch(this.config.errorKeys.get)
        );
    }

    /**
     * Creates a new Entity via a POST request to the backend. Updates the store if request is successfull.
     * @param entity Entitiy to create
     */
    create(entity: T) {
        return this.httpClient
            .post(this.replaceQueryParams(this.config.baseUrl + '/' + this.config.urls.create, entity), entity)
            .pipe(
                tap((res: T) => {
                    const store = this._store.getValue();
                    store.push(res);
                    this._store.next(store);
                }),
                this.catch(this.config.errorKeys.create)
            );
    }

    /**
     * Deletes an entity. Sends DELETE request to the backend and updates the store on success.
     * @param entity Entity to delete. Only the id is sufficient
     */
    delete(entity: Storable) {
        return this.httpClient
            .delete(this.replaceQueryParams(this.config.baseUrl + '/' + this.config.urls.delete, entity))
            .pipe(
                tap(res => {
                    let store = this._store.getValue();
                    store = store.filter(storeEntity => storeEntity.id + '' !== entity.id + '');
                    this._store.next(store);
                }),
                this.catch(this.config.errorKeys.delete)
            );
    }

    /**
     * Updates an item by sending a PATCH request to the backend. Updates store un success accordingly.
     * @param entity Entity to update
     */
    update(entity: T) {
        return this.httpClient
            .patch<T>(this.replaceQueryParams(this.config.baseUrl + '/' + this.config.urls.update, entity), entity)
            .pipe(
                tap(res => {
                    let store = this._store.getValue();
                    store = store.map(storedEntity => (entity.id + '' === storedEntity.id + '' ? res : storedEntity));
                    this._store.next(store);
                }),
                this.catch(this.config.errorKeys.update)
            );
    }

    /** Decide if the data in the store should be reloaded */
    private shouldReload() {
        return !this._store.getValue().length || this.lastUpdate + this.config.timeToLive < Date.now();
    }

    /**
     * Replaces all occurences of :<key> in the url with the value provided in the entity unter the key.
     * e.g. Url: '/base/:typeId/:id' , entity: {typeId: 1, id: '2'} => '/base/1/2';
     * @param url Url
     * @param entity Object containing the keys and values to replace
     */
    private replaceQueryParams(url: string, entity: Storable) {
        console.log(url, entity);
        Object.keys(entity).forEach(key => {
            url = url.replace(':' + key, entity[key]);
        });
        return url;
    }

    /**
     * Shows a snackbar
     * @param text Text to display (gets translated)
     */
    private catch(text: string): OperatorFunction<any, any> {
        return catchError(res => {
            const translated = this.translate.instant(text);
            this.snackbar.open(translated);
            return throwError(res);
        });
    }
}
