import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { ItemListDataSource } from './items-list.datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

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

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'name'];

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        this.dataSource = new ItemListDataSource(this.paginator, this.sort);
        this.displayedColumns = this.dataSource.cols;
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
