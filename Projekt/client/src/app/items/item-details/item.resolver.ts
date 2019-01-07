import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { empty, Observable } from 'rxjs';

import { ItemService } from '../item.service';
import { Item } from '../types/item.interface';

/**
 * Loads the item defined in :id and :typeId in the url
 */
@Injectable({ providedIn: 'root' })
export class ItemResolver implements Resolve<Item> {
    constructor(private itemService: ItemService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Item> {
        const { id, typeId } = route.params;
        if (id && typeId) {
            return this.itemService.getItem(typeId, id);
        } else {
            // Couldn't find id and itemType, so abort navigation
            return empty();
        }
    }
}
