import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, empty } from 'rxjs';
import { flatMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ItemErrorService } from './item-error.service';
import { ItemPipe } from './item-pipe.service';
import { ApiItem } from './types/api/api-item.interface';
import { ApiItemsResponse } from './types/api/api-items-response.interface';
import { Item } from './types/item.interface';

/**
 * The Item store is used to create, delete, update and retrieve items.
 * It takes care of storing items to minimize the requests to the backend.
 * Currently loaded items are {@link ItemService#items} observable which emits all loaded items when anything in the loaded values changes.
 * To change pagination and load the desired items use {@link ItemService#loadItems}
 * Information about pagination can be retrieved via
 * {@link ItemService#page} {@link ItemService#type} {@link ItemService#perPage} {@link ItemService#total}.
 * Errors occuring in any request are handled inside the {@link ItemErrorService}.
 */
@Injectable({
    providedIn: 'root'
})
export class ItemService {
    baseUrl = `${environment.baseUrl}/items`;

    private _page = 0;
    private _perPage = 50;
    private _total = 0;
    private _type = 0;
    private _orderBy = '';
    private _order = '';

    /** current page index of the store */
    get page() {
        return this._page;
    }
    /** current item type of the store */
    get type() {
        return this._type;
    }
    /** amount of items in the store per page */
    get perPage() {
        return this._perPage;
    }
    /** amount of items of this type available in the backend */
    get total() {
        return this._total;
    }

    private _items = new BehaviorSubject<ApiItem[]>([]);
    /** Stores all currently loaded items in the form the backend sends them */
    readonly rawItems: Observable<ApiItem[]> = this._items.asObservable();
    /** Stores all currently loaded items */
    readonly items: Observable<Item[]> = this._items.pipe(
        this.itemPipe.toItem()
    );

    constructor(
        private http: HttpClient,
        private itemErrorService: ItemErrorService,
        private itemPipe: ItemPipe
    ) {}

    /**
     * Loads a list of items into the store
     * @param page current page index
     * @param perPage items per page
     * @param type the type of items which should be loaded
     */
    loadItems(
        page = this.page,
        perPage = this.perPage,
        type = this.type,
        orderBy = this._orderBy,
        order = this._order
    ): Observable<Observable<Item[]>> {
        this._page = page;
        this._perPage = perPage;
        this._type = type;
        this._order = order;
        this._orderBy = orderBy;
        return this.http
            .get<ApiItemsResponse>([this.baseUrl, this.type].join('/'), {
                observe: 'response',
                params: {
                    page: page.toString(),
                    per_page: perPage.toString(),
                    order: order.toString(),
                    orderBy: orderBy.toString()
                }
            })
            .pipe(
                map(res => {
                    this._total = Number.parseInt(
                        res.headers.get('X-Total'),
                        10
                    );
                    this._items.next(res.body.items);
                    return this.items;
                })
            );
    }

    /** Helper class to generate a rxjs operator for a update in the store  */
    private storeUpdate(type, update) {
        return map(res => {
            if (this.type + '' === type + '') {
                this._items.next(update(this._items.getValue(), res));
            }
            return res;
        });
    }

    /**
     * Creates a new Entity
     * @param entity Entity to create
     */
    createItem(item: Item) {
        const entity = this.itemPipe.retransformItem(item);
        return this.http
            .post(`${this.baseUrl}/${entity.typeId}`, entity.fields)
            .pipe(
                this.rxjsStoreCreateUpdate(entity),
                this.itemErrorService.createError()
            );
    }
    /** adds a new item into the store */
    private rxjsStoreCreateUpdate(entity: ApiItem) {
        return this.storeUpdate(entity.typeId, (items, res) => {
            items.push(...res.items);
            this._total++;
            return items;
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
                const storedItem = items.find(
                    item =>
                        item.typeId + '' === typeId + '' &&
                        item.id + '' === itemId + ''
                );
                if (!storedItem) {
                    return this.getItemFromBackend(typeId, itemId);
                }
                return of(storedItem);
            })
        );
    }
    /** Retriev item from backend if not found in the store */
    private getItemFromBackend(typeId, itemId): Observable<Item> {
        return this.http
            .get<ApiItemsResponse>(`${this.baseUrl}/${typeId}/${itemId}`)
            .pipe(
                flatMap(res => {
                    return this.itemPipe.transform(res.items);
                }),
                map(item => item[0]),
                this.itemErrorService.getItemError()
            );
    }

    /**
     * Updates a an item
     * @param entity item to update
     */
    updateItem(item: Item) {
        const entity = this.itemPipe.retransformItem(item);
        return this.http
            .patch(
                `${this.baseUrl}/${entity.typeId}/${entity.id}`,
                entity.fields
            )
            .pipe(
                this.rxjsStoreEditUpdate(entity.typeId),
                this.itemErrorService.updateError()
            );
    }
    /** updates an item in the store */
    private rxjsStoreEditUpdate(typeId) {
        return this.storeUpdate(typeId, (items, res) => {
            const updatedItem = res.items[0];
            return items.map(item => {
                return item.typeId + '' === updatedItem.typeId + '' &&
                    item.id + '' === updatedItem.id + ''
                    ? updatedItem
                    : item;
            });
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
        return this.storeUpdate(typeId, items =>
            items.filter(
                item =>
                    item.id + '' !== itemId + '' ||
                    item.typeId + '' !== typeId + ''
            )
        );
    }
}
