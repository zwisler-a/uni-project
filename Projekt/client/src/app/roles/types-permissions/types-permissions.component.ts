import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange, MatTableDataSource } from '@angular/material';
import { Type } from 'src/app/models/type.interface';
import { TypesService } from 'src/app/types/_type-store/types.service';
import { Permission } from 'src/app/models/permission.enum';
import { Subject, combineLatest } from 'rxjs';

@Component({
    selector: 'app-types-permissions',
    templateUrl: './types-permissions.component.html',
    styleUrls: ['./types-permissions.component.scss']
})
export class TypesPermissionsComponent implements OnInit, OnChanges {
    dataSource = new MatTableDataSource();

    checked = {
        write: false,
        read: false
    };
    indeterminate = {
        write: false,
        read: false
    };

    @Input()
    permissions: { [key: string]: number };

    private permissions$ = new Subject<{ [key: string]: number }>();

    constructor(private typeService: TypesService) {}

    ngOnInit() {
        combineLatest(this.typeService.types, this.permissions$).subscribe(([types]: [Type[], any]) => {
            this.dataSource.data = types.map(type => {
                const typePerm = {
                    name: type.name,
                    typeId: type.id
                };
                console.log(typePerm)
                this.defineObjectPermissionBitmaskProps(typePerm, 'read', Permission.ITEM_READ, type.id);
                this.defineObjectPermissionBitmaskProps(typePerm, 'write', Permission.ITEM_WRITE, type.id);
                return typePerm;
            });
        });
    }

    private defineObjectPermissionBitmaskProps(obj: Object, property: string, permission: Permission, typeId: number) {
        Object.defineProperty(obj, property, {
            set: val => {
                if (val) {
                    this.permissions[typeId] |= permission;
                } else {
                    this.permissions[typeId] &= ~permission;
                }
            },
            get: () => {
                return (this.permissions[typeId] & permission) !== 0;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['permissions']) {
            this.permissions$.next(this.permissions);
        }
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
