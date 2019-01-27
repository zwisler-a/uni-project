import { SelectionModel } from '@angular/cdk/collections';
import { Component, Host, OnDestroy, OnInit, ViewChild, Optional } from '@angular/core';
import { MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skip, throttleTime } from 'rxjs/operators';
import { Field } from 'src/app/models/field.interface';
import { Item } from 'src/app/models/item.interface';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

import { FieldsService } from '../_fields-store/fields.service';
import { ItemService } from '../_item-store/item.service';
import { ItemListDataSource } from './items-list.datasource';
import { fadeInOut, fadeIn } from 'src/app/shared/animations';

/**
 * Display a list of currently loaded items
 */
@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss'],
    animations: [fadeInOut, fadeIn]
})
export class ItemsListComponent implements OnInit, OnDestroy {
    // Material tabel
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSidenav) sidenav: MatSidenav;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: ItemListDataSource;
    // --------------

    /** Columns which should be in the table */
    displayedColumns = [];
    displayColsSub: Subscription;
    searchSub: Subscription;

    constructor(
        private router: Router,
        private itemService: ItemService,
        private fieldsService: FieldsService,
        private activatedRoute: ActivatedRoute,
        @Optional() @Host() private pageComponent: DefaultPageComponent
    ) {}

    ngOnInit() {
        this.dataSource = new ItemListDataSource(this.paginator, this.sort, this.itemService, this.activatedRoute, this.router);
        // Subscribe to which columns should be displayed
        this.displayColsSub = this.fieldsService.displayableColumns.subscribe(cols => {
            this.displayedColumns = cols;
        });

        // set page setting (action / title)
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
        // subscribe to search changes. Skip the first one since search is a BehaviourSubject and emits an empty string
        // and throttle so we wont send way to many request to the backend
        this.searchSub = this.pageComponent.search
            .pipe(
                throttleTime(100),
                skip(1)
            )
            .subscribe(query => {
                this.itemService.loadItems({ searchQuery: query }).subscribe();
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
