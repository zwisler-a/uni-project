import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ItemService } from '../item.service';
import { ApiItemType } from '../types/api/api-item-type.interface';
import { Field } from '../types/field.interface';
import { Item } from '../types/item.interface';
import { ItemListDataSource } from './items-list.datasource';

/**
 * Display of items given in the resolve data
 */
@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSidenav) sidenav: MatSidenav;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: ItemListDataSource;
    selection = new SelectionModel<any>(true, []);

    displayedColumns = [];

    constructor(
        private router: Router,
        private itemService: ItemService,
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
        this.activatedRoute.data.subscribe(data => {
            this.displayedColumns = [];
            data.list.types.forEach((type: ApiItemType) => {
                type.fields.forEach(field => {
                    this.displayedColumns.push(field.name);
                });
            });
        });
        // this.displayedColumns = [];
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
