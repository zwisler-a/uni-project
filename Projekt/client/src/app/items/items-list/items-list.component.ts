import { SelectionModel } from '@angular/cdk/collections';
import { Component, Host, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Field } from 'src/app/models/field.interface';
import { Item } from 'src/app/models/item.interface';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

import { FieldsService } from '../_fields-store/fields.service';
import { ItemService } from '../_item-store/item.service';
import { ItemListDataSource } from './items-list.datasource';
import { debounceTime, throttleTime } from 'rxjs/operators';

/**
 * Display of items given in the resolve data
 */
@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSidenav) sidenav: MatSidenav;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: ItemListDataSource;
    selection = new SelectionModel<any>(true, []);

    displayedColumns = [];
    displayColsSub: Subscription;
    searchSub: Subscription;

    constructor(
        private router: Router,
        private itemService: ItemService,
        private fieldsService: FieldsService,
        private activatedRoute: ActivatedRoute,
        @Host() private pageComponent: DefaultPageComponent
    ) {}

    ngOnInit() {
        this.dataSource = new ItemListDataSource(this.paginator, this.sort, this.itemService, this.activatedRoute, this.router);
        this.displayColsSub = this.fieldsService.displayableColumns.subscribe(cols => {
            this.displayedColumns = cols;
        });
        this.pageComponent.title = 'items.title';
        this.pageComponent.actions.next([
            {
                icon: 'add',
                tooltip: '',
                click: () => {
                    this.router.navigate(['/items', 'view', { outlets: { detail: ['add'] } }]);
                }
            }
        ]);
        this.searchSub = this.pageComponent.search.pipe(throttleTime(100)).subscribe(query => {
            this.itemService.loadItems(undefined, undefined, undefined, query, undefined, undefined).subscribe();
        });
    }

    ngOnDestroy() {
        if (this.displayColsSub) {
            this.displayColsSub.unsubscribe();
        }
        if (this.searchSub) {
            this.searchSub.unsubscribe();
        }
    }

    /** Open item detail page (sidenav) */
    async open(row: Item) {
        await this.router.navigate(['/items', 'view', { outlets: { detail: ['details', row.typeId, row.id] } }]);
    }

    /** Returns a displayable value for a field */
    findByName(fields: Field[], name: string) {
        const displayField = fields.find(field => field.name === name);
        return displayField ? displayField.displayValue : '';
    }
}
