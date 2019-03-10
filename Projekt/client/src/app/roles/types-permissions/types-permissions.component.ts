import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatCheckboxChange, MatTableDataSource } from '@angular/material';
import { Type } from 'src/app/models/type.interface';
import { TypesService } from 'src/app/types/_type-store/types.service';
import { Permission } from 'src/app/models/permission.enum';
import { BehaviorSubject, combineLatest, Subscription, Subject } from 'rxjs';

/**
 * Displays a searchable list with all permission for each type.
 */
@Component({
    selector: 'app-types-permissions',
    templateUrl: './types-permissions.component.html',
    styleUrls: ['./types-permissions.component.scss']
})
export class TypesPermissionsComponent implements OnInit, OnChanges, OnDestroy {
    dataSource = new MatTableDataSource();

    checked = {
        write: false,
        type: false,
        read: false
    };
    indeterminate = {
        write: false,
        type: false,
        read: false
    };

    /** Permissions to be displayed */
    @Input()
    permissions: { [key: string]: number };

    private _disabled = false;

    /** If the user can input data */
    @Input()
    set disabled(val: boolean) {
        this.dataSource.data.forEach((row: { disabled: boolean }) => (row.disabled = val));
        this._disabled = val;
    }

    get disabled() {
        return this._disabled;
    }

    /** Helper to trigger transformation of types to permission objects. Emits onChange */
    private permissions$ = new Subject<{ [key: string]: number }>();
    objTransformSub: Subscription;

    constructor(private typeService: TypesService) {}

    ngOnInit() {
        this.objTransformSub = combineLatest(this.typeService.types, this.permissions$).subscribe(([types]: [Type[], any]) => {
            this.dataSource.data = types.map(type => {
                const typePerm = {
                    name: type.name,
                    typeId: type.id,
                    disabled: this._disabled
                };
                this.defineObjectPermissionBitmaskProps(typePerm, 'read', Permission.ITEM_READ, type.id);
                this.defineObjectPermissionBitmaskProps(typePerm, 'write', Permission.ITEM_WRITE, type.id);
                this.defineObjectPermissionBitmaskProps(typePerm, 'type', Permission.TYPE_EDIT, type.id);
                return typePerm;
            });
        });
        if (this.permissions) {
            this.permissions$.next(this.permissions);
        }
    }

    /**
     * Adds a property to the object with a getter and setter. This property accesses this.permission at the
     * apropiate type and updates the bit defined by the permission param.
     * @param obj Object to add the property to.
     * @param property Property to be added
     * @param permission Which bitmask should be used
     * @param typeId For which type the permission should be set
     */
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

    ngOnDestroy(): void {
        if (this.objTransformSub) {
            this.objTransformSub.unsubscribe();
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

    typeChange(ev: MatCheckboxChange) {
        this.dataSource.data.forEach((col: { type: boolean }) => {
            col.type = ev.checked;
        });
        this.checked.type = ev.checked;
    }
}
