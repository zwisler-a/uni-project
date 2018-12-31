import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Item } from '../types/item.interface';
import { environment } from 'src/environments/environment.prod';
import { ItemService } from '../item.service';

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
    private items: ItemService
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
    this._loading = true;
    return this.items.getItems(page, itemsPerPage).pipe(
      map((res: HttpResponse<[]>) => {
        this.paginator.length =
          Number.parseInt(res.headers.get('X-Total'), 10) || 0;
        this._loading = false;
        return res.body;
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
