import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

import { Item } from '../../models/item.interface';
import { ItemService } from '../_item-store/item.service';
import { ListState } from '../_item-store/list-state.interface';

/**
 * Loads the items and makes sure the route is correct
 */
@Injectable({ providedIn: 'root' })
export class ItemsListResolver implements Resolve<Item> {
    constructor(private itemService: ItemService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const { page, perPage, itemTypeId, order, orderBy } = route.params;
        // check if route has all important info
        if (page === undefined || perPage === undefined) {
            const defaultRoute = [
                '/items',
                'view',
                {
                    outlets: {
                        content: [0, 50]
                    }
                }
            ];
            this.router.navigate(defaultRoute);
            return EMPTY;
        }
        const listState: ListState = {
            page: page,
            perPage: perPage,
            order,
            orderBy,
            type: itemTypeId
        };
        return this.itemService.loadItems(listState);
    }
}
