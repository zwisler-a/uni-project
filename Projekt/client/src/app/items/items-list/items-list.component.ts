import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../types/item.interface';
import { ItemListDataSource } from './items-list.datasource';
import { ApiItemType } from '../types/api/api-item-type.interface';
import { Field } from '../types/field.interface';

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
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.dataSource = new ItemListDataSource(
            this.paginator,
            this.sort,
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

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.data.forEach(row => this.selection.select(row));
    }

    async open(row: Item) {
        await this.router.navigate([
            '/items',
            'view',
            { outlets: { detail: ['details', row.typeId, row.id] } }
        ]);
    }

    findByName(fields: Field[], name: string) {
        return fields.find(field => field.name === name).displayValue || '';
    }
}
