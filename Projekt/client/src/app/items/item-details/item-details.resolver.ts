import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ItemTransformationService } from '../item-transformation.service';
import { ItemService } from '../item.service';
import { ApiItemsResponse } from '../types/api/api-items-response.interface';
import { Item } from '../types/item.interface';

/**
 * Loads the item defined in :id and :typeId in the url
 */
@Injectable({ providedIn: 'root' })
export class ItemDetailResolver implements Resolve<Item> {
    constructor(
        private itemService: ItemService,
        private transform: ItemTransformationService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Item> {
        const { id, typeId } = route.params;
        if (id && typeId) {
            return this.itemService.getItem(typeId, id).pipe(
                map((res: ApiItemsResponse) => {
                    return this.transform.transformItems(res.items, res.types)[0];
                })
            );
        } else {
            // Couldn't find id and itemType, so abort navigation
            return empty();
        }
    }
}
