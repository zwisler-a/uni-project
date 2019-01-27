import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatCheckboxChange } from '@angular/material';
import { Type } from 'src/app/models/type.interface';
import { TypesService } from 'src/app/types/_type-store/types.service';

@Component({
    selector: 'app-role-detail',
    templateUrl: './role-detail.component.html',
    styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {
    dataSource = new MatTableDataSource();

    checked = {
        write: false,
        read: false
    };
    indeterminate = {
        write: false,
        read: false
    };

    constructor(private typeService: TypesService) {}

    ngOnInit() {
        this.typeService.loadTypes().subscribe();
        this.typeService.types.subscribe((types: Type[]) => {
            this.dataSource.data = types.map(type => {
                return { name: type.name, typeId: type.id, read: false, write: false };
            });
        });
    }

    readChange(ev: MatCheckboxChange) {
        this.dataSource.data.forEach((col: { read: boolean }) => {
            col.read = ev.checked;
        });
        this.checked.read = ev.checked;
    }

    writeChange(ev: MatCheckboxChange) {
        this.dataSource.data.forEach((col: { write: boolean }) => {
            col.write = ev.checked;
        });
        this.checked.write = ev.checked;
    }
}
