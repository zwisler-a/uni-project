import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ItemService } from '../item.service';
import { ApiItem } from '../types/api/api-item.interface';
import { ApiItemsResponse } from '../types/api/api-items-response.interface';
import { Item } from '../types/item.interface';
import { ApiItemType } from '../types/api/api-item-type.interface';
import { ItemTransformationService } from '../item-transformation.service';

@Injectable({ providedIn: 'root' })
export class ItemsListResolver implements Resolve<Item> {
    constructor(
        private itemService: ItemService,
        private router: Router,
        private transform: ItemTransformationService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        const { page, perPage, itemTypeId } = route.params;
        if (page === undefined || perPage === undefined) {
            const defaultRoute = [
                '/items',
                'view',
                { outlets: { content: [0, 50, 1] } }
            ];
            if (itemTypeId !== undefined) {
                defaultRoute.push(itemTypeId);
            }
            this.router.navigate(defaultRoute);
        }
        return this.itemService.getItems(page, perPage, itemTypeId).pipe(
            map((res: HttpResponse<ApiItemsResponse>) => {
                const body = res.body;
                return {
                    page,
                    perPage,
                    list: this.transform.transformItems(body.items, body.types),
                    types: body.types,
                    length: Number.parseInt(res.headers.get('X-Total'), 10) || 0
                };
            })
        );
    }
}
