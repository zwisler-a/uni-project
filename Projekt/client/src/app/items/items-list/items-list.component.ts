import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { ItemListDataSource } from './items-list.datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../item.service';

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
            this.displayedColumns = data.fields;
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

    async open(row) {
        const id = 1;
        await this.router.navigate([
            '/items',
            'view',
            { outlets: { detail: ['details', 1, 1] } }
        ]);
    }
}
