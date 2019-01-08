import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { empty, Observable } from 'rxjs';

import { ItemService } from '../item.service';
import { Item } from '../types/item.interface';
import { ApiItem } from '../types/api/api-item.interface';
import { ApiTypeField } from '../types/api/api-type-field.interface';
import { ApiItemType } from '../types/api/api-item-type.interface';
import { ItemTransformationService } from '../item-transformation.service';
import { map } from 'rxjs/operators';
import { ApiItemResponse } from '../types/api/api-item-response.interface';

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
                map((res: ApiItemResponse) => {
                    return this.transform.transformItem(res.item, res.type);
                })
            );
        } else {
            // Couldn't find id and itemType, so abort navigation
            return empty();
        }
    }
}
