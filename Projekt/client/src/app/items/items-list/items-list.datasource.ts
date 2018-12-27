import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Item } from '../types/item.interface';

/**
 * Data source for the ItemList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ItemListDataSource extends DataSource<any> {
    data: any[] = [];
    possibleColumnNames: string[] = [];
    constructor(
        private paginator: MatPaginator,
        private sort: MatSort,
        private itemService: HttpClient
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

        return merge(...dataMutations, of('')).pipe(
            mergeMap(() => {
                return this.getProcessedData(
                    this.paginator.pageIndex,
                    this.paginator.pageSize,
                    '',
                    false
                );
            })
        );
    }

    getProcessedData(
        page: number,
        itemsPerPage: number,
        sortBy: string,
        asc: boolean
    ): Observable<Item[]> {
        const params = new HttpParams();
        params.set('page', page.toString());
        params.set('per_page', itemsPerPage.toString());

        const data = [
            { id: 0 + page, companyId: 0, fields: { test: '123' } },
            { id: 1 + page, companyId: 1, fields: { asd: 'asd' } },
            { id: 2 + page, companyId: 2, fields: { fuck: 'christmas' } },
            { id: 3 + page, companyId: 3, fields: { iwant: 'tosleep' } }
        ];

        this.possibleColumnNames = this.getPossibleColumnNames(data);

        this.paginator.length = 100;
        return of(data);
        /*
        return this.itemService.get('', { observe: 'response' }).pipe(
            map((res: HttpResponse<[]>) => {
                this.paginator.length =
                    Number.parseInt(res.headers.get('X-Total'), 10) || 0;
                return res.body;
            })
        );*/
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
