import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange, MatTableDataSource } from '@angular/material';
import { Type } from 'src/app/models/type.interface';
import { TypesService } from 'src/app/types/_type-store/types.service';

@Component({
    selector: 'app-types-permissions',
    templateUrl: './types-permissions.component.html',
    styleUrls: ['./types-permissions.component.scss']
})
export class TypesPermissionsComponent implements OnInit {
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
