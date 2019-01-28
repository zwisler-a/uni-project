import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { flatMap, map, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ApiItem } from '../../models/api/api-item.interface';
import { EmbeddedItems } from '../../models/api/embedded-items.interface';
import { Item } from '../../models/item.interface';
import { ItemErrorService } from './item-error.service';
import { ItemPipe } from './item-pipe.service';
import { ListState } from './list-state.interface';
import { WsService } from 'src/app/ws/ws.service';

/**
 * The Item store is used to create, delete, update and retrieve items.
 * It takes care of storing items to minimize the requests to the backend.
 * Currently loaded items are {@link ItemService#items} observable which emits all loaded items when anything in the loaded values changes.
 * To change pagination and load the desired items use {@link ItemService#loadItems}
 * Information about pagination, search and sort are in {@link ItemService#listState}.
 * Errors occuring in any request are handled inside the {@link ItemErrorService}.
 */
@Injectable({
    providedIn: 'root'
})
export class ItemService {
    baseUrl = `${environment.baseUrl}/items`;

    /** information about the loaded items */
    listState: ListState = {
        page: 0,
        perPage: 50,
        total: 0
    };

    private _items = new BehaviorSubject<EmbeddedItems>({ items: [], types: [] });
    /** Stores all currently loaded items in the form the backend sends them */
    readonly rawItems: Observable<EmbeddedItems> = this._items.asObservable();
    /** Stores all currently loaded items */
    readonly items: Observable<Item[]> = this._items.pipe(this.itemPipe.toItem());

    constructor(
        private http: HttpClient,
        private itemErrorService: ItemErrorService,
        private itemPipe: ItemPipe,
        private ws: WsService
    ) {
        const wsRoute = this.ws.forRoute(this.baseUrl);
        wsRoute
            .pipe(
                filter(res => res.method === 'PATCH'),
                map(res => res.body),
                this.rxjsStoreEditUpdate()
            )
            .subscribe();
        wsRoute
            .pipe(
                filter(res => res.method === 'POST'),
                map(res => res.body),
                this.rxjsStoreCreateUpdate({} as any)
            )
            .subscribe();
        wsRoute.pipe(filter(res => res.method === 'DELETE')).subscribe(res => {
            const ids = res.url.split('/');
            console.log(ids);
            const store = this._items.getValue();
            this.listState.total--;
            store.items = store.items.filter(item => item.id + '' !== ids[1] + '' || item.typeId + '' !== ids[0] + '');
            this._items.next(store);
        });
    }

    /**
     * Loads a list of items into the store
     * @param page current page index
     * @param perPage items per page
     * @param type the type of items which should be loaded
     */
    loadItems(state: ListState): Observable<Observable<Item[]>> {
        const newState = Object.assign(this.listState, state);
        Object.keys(newState).forEach(key => newState[key] == null && delete newState[key]);
        this.listState = newState;
        return this.http
            .get<EmbeddedItems>([this.baseUrl, this.listState.type].join('/'), {
                observe: 'response',
                params: newState as {}
            })
            .pipe(
                map(res => {
                    this.listState.total = Number.parseInt(res.headers.get('X-Total'), 10);
                    this._items.next(res.body);
                    return this.items;
                })
            );
    }

    /** Helper class to generate a rxjs operator for a update in the store  */
    private storeUpdate(type: any, update: (store: EmbeddedItems, res: EmbeddedItems) => EmbeddedItems) {
        return map((res: EmbeddedItems) => {
            if (this.listState.type + '' === type + '' || !this.listState.type || !type) {
                this._items.next(update(this._items.getValue(), res));
            }
            return res;
        });
    }

    /**
     * Creates a new Entity
     * @param entity Entity to create
     */
    createItem(typeId: number, item: { id: number; value: any }[]) {
        return this.http.post(`${this.baseUrl}/${typeId}`, item).pipe(
            this.rxjsStoreCreateUpdate({ typeId } as ApiItem),
            this.itemErrorService.createError()
        );
    }
    /** adds a new item into the store */
    private rxjsStoreCreateUpdate(entity: ApiItem) {
        return this.storeUpdate(entity.typeId, (store, res) => {
            store.items.push(...res.items);
            this.listState.total++;
            return store;
        });
    }

    /**
     * Loads one item
     * @param typeId type of the item
     * @param itemId item to load
     */
    getItem(typeId: number, itemId: number): Observable<Item> {
        return this.items.pipe(
            flatMap(items => {
                const storedItem = items.find(item => item.typeId + '' === typeId + '' && item.id + '' === itemId + '');
                if (!storedItem) {
                    return this.getItemFromBackend(typeId, itemId);
                }
                return of(storedItem);
            })
        );
    }
    /** Retriev item from backend if not found in the store */
    private getItemFromBackend(typeId, itemId): Observable<Item> {
        return this.http.get<EmbeddedItems>(`${this.baseUrl}/${typeId}/${itemId}`).pipe(
            flatMap(res => {
                return this.itemPipe.transform(res.items, res.types);
            }),
            this.itemErrorService.getItemError()
        );
    }

    /**
     * Updates a an item
     * @param entity item to update
     */
    updateItem(typeId: number, itemId: number, fields: { id: number; value: any }[]) {
        return this.http.patch(`${this.baseUrl}/${typeId}/${itemId}`, fields).pipe(
            this.rxjsStoreEditUpdate(typeId),
            this.itemErrorService.updateError()
        );
    }
    /** updates an item in the store */
    private rxjsStoreEditUpdate(typeId?) {
        return this.storeUpdate(typeId, (store, res) => {
            const updatedItem = res.items[0];
            const newStore = store;
            newStore.items = store.items.map(item => {
                return item.typeId + '' === updatedItem.typeId + '' && item.id + '' === updatedItem.id + ''
                    ? updatedItem
                    : item;
            });
            return newStore;
        });
    }

    /**
     * Deletes an item
     * @param typeId type of the item
     * @param itemId id of the item
     */
    deleteItem(typeId: number, itemId: number) {
        return this.http.delete(`${this.baseUrl}/${typeId}/${itemId}`).pipe(
            this.rxjsStoreDeleteUpdate(typeId, itemId),
            this.itemErrorService.deleteError()
        );
    }
    /** deletes the item in the store */
    private rxjsStoreDeleteUpdate(typeId: number, itemId: number) {
        return this.storeUpdate(typeId, store => {
            const newStore = store;
            this.listState.total--;
            newStore.items = store.items.filter(item => item.id + '' !== itemId + '' || item.typeId + '' !== typeId + '');
            return newStore;
        });
    }
}
