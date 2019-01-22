import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { empty, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { ItemService } from '../../stores/item-store/item.service';
import { Item } from '../../stores/item-store/types/item.interface';
import { TypesService } from '../../stores/type-store/types.service';

@Injectable({ providedIn: 'root' })
export class ItemsListResolver implements Resolve<Item> {
    constructor(
        private itemService: ItemService,
        private router: Router,
        private snackbar: MatSnackBar,
        private types: TypesService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.types.loadTypes().pipe(
            flatMap(types => {
                if (!types.getValue().length) {
                    this.router.navigate(['/types']);
                    this.snackbar.open('No types to display', '', {
                        duration: 2000,
                        horizontalPosition: 'end'
                    });
                    return empty();
                }
                const {
                    page,
                    perPage,
                    itemTypeId,
                    order,
                    orderBy
                } = route.params;
                // check if route has all important info
                if (
                    page === undefined ||
                    perPage === undefined ||
                    itemTypeId === undefined
                ) {
                    const defaultRoute = [
                        '/items',
                        'view',
                        {
                            outlets: {
                                content: [0, 50, types.getValue()[0].id]
                            }
                        }
                    ];
                    this.router.navigate(defaultRoute);
                    return empty();
                }
                return this.itemService.loadItems(
                    page,
                    perPage,
                    itemTypeId,
                    orderBy,
                    order
                );
            })
        );
    }
}
