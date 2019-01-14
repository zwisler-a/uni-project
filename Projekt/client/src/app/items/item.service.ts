import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ItemTransformationService } from './item-transformation.service';
import { ApiItem } from './types/api/api-item.interface';
import { ApiItemsResponse } from './types/api/api-items-response.interface';
import { ItemListData } from './types/item-list.interface';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    baseUrl = `${environment.baseUrl}/items`;

    /** cache of the items to lower backend requests */
    private store: ApiItemsResponse = { items: [], types: [] };
    private _storeUpdated = new Subject<{ list: ItemListData }>();
    /** Triggered once the store gets updated */
    storeUpdated = this._storeUpdated.asObservable();
    /** Type which has gotten fetched last */
    private lastFetchedType: string | number;

    constructor(
        private http: HttpClient,
        private snackbar: MatSnackBar,
        private translate: TranslateService,
        private transformService: ItemTransformationService
    ) {}

    /**
     * Loads a list of items
     * @param page current page index
     * @param perPage items per page
     * @param type the type of items which should be loaded
     */
    getItems(page: number, perPage: number, type?: string | number) {
        this.lastFetchedType = type;
        const params = new HttpParams();
        params.append('page', page.toString());
        params.append('per_page', perPage.toString());
        return this.http
            .get<ApiItemsResponse>([this.baseUrl, type].join('/'), {
                observe: 'response',
                params: { page: page.toString(), per_page: perPage.toString() }
            })
            .pipe(
                map(res => {
                    this.store = res.body;
                    return res;
                }),
                catchError(err => {
                    // Do some always required error handling, like showing a snackbar if necessary
                    // rethrow the error
                    return throwError(err);
                })
            );
    }

    /**
     * Creates a new Entity
     * @param entity Entity to create
     */
    createItem(entity: ApiItem) {
        return this.http
            .post(`${this.baseUrl}/${entity.typeId}`, entity.fields)
            .pipe(
                map((res: ApiItemsResponse) => {
                    if (this.lastFetchedType + '' === entity.typeId + '') {
                        this.store.items.push(res.items[0]);
                        this.emitStoreUpdate(1);
                    }
                    return res;
                }),
                catchError(err => {
                    this.translate
                        .get('items.error.create')
                        .subscribe(message => this.showError(message));
                    return throwError(err);
                })
            );
    }

    /**
     * Loads one item
     * @param typeId type of the item
     * @param itemId item to load
     */
    getItem(typeId: number, itemId: number): Observable<ApiItem> {
        const storedItem = this.store.items.find(
            storeItem =>
                storeItem.typeId + '' === typeId + '' &&
                storeItem.id + '' === itemId + ''
        );
        if (storedItem) {
            return of(storedItem);
        }
        return this.http.get(`${this.baseUrl}/${typeId}/${itemId}`).pipe(
            map((res: ApiItemsResponse) => {
                this.store.items.unshift(res.items[0]);
                return res.items[0];
            }),
            catchError(err => {
                this.translate
                    .get('items.error.get')
                    .subscribe(message => this.showError(message));
                return throwError(err);
            })
        );
    }

    /**
     * Updates a an item
     * @param entity item to update
     */
    updateItem(entity: ApiItem) {
        return this.http
            .patch(
                `${this.baseUrl}/${entity.typeId}/${entity.id}`,
                entity.fields
            )
            .pipe(
                map((res: ApiItemsResponse) => {
                    this.invalidateStore(entity.typeId, entity.id);
                    if (this.lastFetchedType + '' === entity.typeId + '') {
                        this.store.items.unshift(res.items[0]);
                    }
                    this.emitStoreUpdate();
                    return res.items[0];
                }),
                catchError(err => {
                    this.translate
                        .get('items.error.update')
                        .subscribe(message => this.showError(message));
                    return throwError(err);
                })
            );
    }

    /**
     * Deletes an item
     * @param typeId type of the item
     * @param itemId id of the item
     */
    deleteItem(typeId: number, itemId: number) {
        return this.http.delete(`${this.baseUrl}/${typeId}/${itemId}`).pipe(
            map(res => {
                this.invalidateStore(typeId, itemId);
                this.emitStoreUpdate(-1);
                return res;
            }),
            catchError(err => {
                this.translate
                    .get('items.error.delete')
                    .subscribe(message => this.showError(message));
                return throwError(err);
            })
        );
    }

    /** Opens a snackbar in case of error */
    showError(message) {
        this.snackbar.open(message, null, {
            duration: 2000,
            horizontalPosition: 'end'
        });
    }

    /**
     * Removes an item from the store
     * @param forTypeId item type id
     * @param forItemId item id
     */
    private invalidateStore(forTypeId: number, forItemId: number) {
        let removedItems = 0;
        this.store.items = this.store.items.filter(item => {
            const is = !(
                item.id + '' === forItemId + '' &&
                item.typeId + '' === forTypeId + ''
            );
            if (is) {
                removedItems--;
            }
            return is;
        });
        return removedItems;
    }

    /** Triggers the storeUpdated with the proper data from the store */
    private async emitStoreUpdate(sizeChange?: number) {
        this._storeUpdated.next({
            list: {
                list: await this.transformService.transformItems(
                    this.store.items
                ),
                length: 0,
                page: 0,
                perPage: 0,
                updateLength: sizeChange
            }
        });
    }
}
