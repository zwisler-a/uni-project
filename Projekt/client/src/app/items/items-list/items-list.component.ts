import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { ItemListDataSource } from './items-list.datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

    // displayedColumns = ['id', 'name'];

    get displayedColumns() {
        return this.dataSource.possibleColumnNames.concat('id') || [];
    }

    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit() {
        this.dataSource = new ItemListDataSource(
            this.paginator,
            this.sort,
            this.http
        );
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
            '/item',
            { outlets: { 'search-page-sidenav': ['view', 123] } }
        ]);
    }
}
