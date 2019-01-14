import { DataSource } from '@angular/cdk/collections';
import { HttpResponse } from '@angular/common/http';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ItemService } from '../item.service';
import { Item } from '../types/item.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemListData } from '../types/item-list.interface';

/**
 * Data source for the ItemList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ItemListDataSource extends DataSource<any> {
    possibleColumnNames: string[] = [];
    readonly listItemsUrl = 'item/list';
    private typeId: any;

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

        merge(...dataMutations).subscribe((ev: any) => {
            this.router.navigate([
                '/items',
                'view',
                {
                    outlets: {
                        content: this.typeId
                            ? [
                                  this.paginator.pageIndex,
                                  this.paginator.pageSize,
                                  this.typeId
                              ]
                            : [
                                  this.paginator.pageIndex,
                                  this.paginator.pageSize
                              ]
                    }
                }
            ]);
        });

        return merge(this.itemService.storeUpdated, this.route.data).pipe(
            map(data => {
                const listData: ItemListData = data['list'];
                this.paginator.pageIndex =
                    listData.page || this.paginator.pageIndex;
                this.paginator.pageSize =
                    listData.perPage || this.paginator.pageSize;
                this.paginator.length =
                    listData.length !== undefined
                        ? listData.length
                        : listData.updateLength
                        ? this.paginator.length + listData.updateLength
                        : this.paginator.length;
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
