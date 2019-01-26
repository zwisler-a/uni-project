import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { empty, Observable, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Item } from '../../models/item.interface';
import { ItemService } from '../_item-store/item.service';
import { TypesService } from 'src/app/types/_type-store/types.service';
import { ListState } from '../_item-store/list-state.interface';

/**
 * TODO: Loading types is no priority here anymore. Should be changed at some point
 */
@Injectable({ providedIn: 'root' })
export class ItemsListResolver implements Resolve<Item> {
    constructor(
        private itemService: ItemService,
        private router: Router,
        private snackbar: MatSnackBar,
        private types: TypesService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.types.loadTypes().pipe(
            flatMap(types => {
                // check if there are at least oany times
                if (!types.getValue().length) {
                    this.router.navigate(['/types']);
                    this.snackbar.open('No types to display', '', {
                        duration: 2000,
                        horizontalPosition: 'end'
                    });
                    return EMPTY;
                }
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
            })
        );
    }
}
