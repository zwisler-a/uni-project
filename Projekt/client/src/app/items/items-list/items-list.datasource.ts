import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ItemService } from '../_item-store/item.service';

/**
 * Data source for the ItemList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ItemListDataSource extends DataSource<any> {
    private typeId: any;
    private mutationSub: Subscription;

    constructor(
        private paginator: MatPaginator,
        private sort: MatSort,
        private itemService: ItemService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<any[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [this.paginator.page, this.sort.sortChange];
        this.route.params.subscribe(params => {
            this.typeId = params.itemTypeId;
        });

        this.mutationSub = merge(...dataMutations).subscribe((ev: any) => {
            const contentRoute: any[] = [this.paginator.pageIndex, this.paginator.pageSize];
            if (this.typeId) {
                contentRoute.push(this.typeId);
            }
            if (this.sort.direction && this.sort.active) {
                contentRoute.push(this.sort.active, this.sort.direction);
            }
            this.router.navigate([
                '/items',
                'view',
                {
                    outlets: {
                        content: contentRoute
                    }
                }
            ]);
        });
        return this.itemService.items.pipe(
            map(items => {
                this.paginator.pageIndex = this.itemService.listState.page;
                this.paginator.pageSize = this.itemService.listState.perPage;
                this.sort.active = this.itemService.listState.orderBy;
                this.sort.direction = this.itemService.listState.order;
                this.paginator.length = this.itemService.listState.total;
                return items;
            })
        );
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {
        this.mutationSub.unsubscribe();
    }
}
