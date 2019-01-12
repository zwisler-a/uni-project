import { DataSource } from '@angular/cdk/collections';
import { HttpResponse } from '@angular/common/http';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ItemService } from '../item.service';
import { Item } from '../types/item.interface';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Data source for the ItemList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ItemListDataSource extends DataSource<any> {
    data: any[] = [];
    possibleColumnNames: string[] = [];
    _loading = false;
    get loading() {
        return this._loading;
    }
    readonly listItemsUrl = 'item/list';

    constructor(
        private paginator: MatPaginator,
        private sort: MatSort,
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

        merge(...dataMutations).subscribe(ev => {
            this.router.navigate([
                '/items',
                'view',
                {
                    outlets: {
                        content: [
                            this.paginator.pageIndex,
                            this.paginator.pageSize
                        ]
                    }
                }
            ]);
        });

        return this.route.data.pipe(
            map(data => {
                const listData = data['list'];
                this.paginator.pageIndex = listData.page;
                this.paginator.pageSize = listData.perPage;
                this.paginator.length = listData.length;
                return listData.list;
            })
        );
    }

    getPossibleColumnNames(data: Item[]): string[] {
        const fieldNames = new Set<string>();
        data.forEach(item => {
            Object.keys(item.fields).forEach(field => fieldNames.add(field));
        });
        return Array.from(fieldNames);
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {}
}
