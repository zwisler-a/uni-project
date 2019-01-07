import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { Item } from '../types/item.interface';
import { delay, map } from 'rxjs/operators';
import { ItemService } from '../item.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ItemsListResolver implements Resolve<Item> {
    constructor(private itemService: ItemService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        const { page, perPage, itemTypeId } = route.params;
        if (page === undefined || perPage === undefined) {
            const defaultRoute = ['/items', 0, 50];
            if (itemTypeId !== undefined) {
                defaultRoute.push(itemTypeId);
            }
            this.router.navigate(defaultRoute);
        }
        return this.itemService.getItems(page, perPage, itemTypeId).pipe(
            map((res: HttpResponse<[]>) => {
                return {
                    page,
                    perPage,
                    list: res.body,
                    length: Number.parseInt(res.headers.get('X-Total'), 10) || 0
                };
            })
        );
    }
}
