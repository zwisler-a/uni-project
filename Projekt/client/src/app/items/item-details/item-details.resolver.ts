import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { ItemTransformationService } from '../item-transformation.service';
import { ItemService } from '../item.service';
import { Item } from '../types/item.interface';

/**
 * Loads the item defined in :id and :typeId in the url.
 * Transforms the item to a easily usable format to.
 */
@Injectable({ providedIn: 'root' })
export class ItemDetailResolver implements Resolve<Item> {
    constructor(
        private itemService: ItemService,
        private transform: ItemTransformationService
    ) {}

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Item> {
        const { id, typeId } = route.params;
        if (id && typeId) {
            const item: any = await this.itemService
                .getItem(typeId, id)
                .toPromise();
            const transformedItem = (await this.transform.transformItems([
                item
            ]))[0];
            return transformedItem;
        } else {
            // Couldn't find id and itemType, so abort navigation
            return Promise.reject();
        }
    }
}
