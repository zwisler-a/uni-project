import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/stores/item-store/item.service';
import { Field } from 'src/app/stores/item-store/types/field.interface';
import { Item } from 'src/app/stores/item-store/types/item.interface';

import { FieldsService } from '../../stores/fields-store/fields.service';
import { ItemListDataSource } from './items-list.datasource';

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

    constructor(
        private router: Router,
        private itemService: ItemService,
        private fieldsService: FieldsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.dataSource = new ItemListDataSource(
            this.paginator,
            this.sort,
            this.itemService,
            this.activatedRoute,
            this.router
        );
        this.displayColsSub = this.fieldsService.displayableColumns.subscribe(
            cols => {
                this.displayedColumns = cols;
            }
        );
    }

    ngOnDestroy() {
        if (this.displayColsSub) {
            this.displayColsSub.unsubscribe();
        }
    }

    /** Open item detail page (sidenav) */
    async open(row: Item) {
        await this.router.navigate([
            '/items',
            'view',
            { outlets: { detail: ['details', row.typeId, row.id] } }
        ]);
    }

    /** Returns a displayable value for a field */
    findByName(fields: Field[], name: string) {
        const displayField = fields.find(field => field.name === name);
        return displayField ? displayField.displayValue : '';
    }
}
