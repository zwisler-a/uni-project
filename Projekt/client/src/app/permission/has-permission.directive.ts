import { Directive, ElementRef, Input, OnChanges, OnDestroy } from '@angular/core';
import { combineLatest, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Permission } from '../models/permission.enum';
import { PermissionService } from './permission.service';

/**
 * Hide an element depending on its permission. Hidden if it doesnt have the permission.
 * Permissions can be given as string (name of enum), number (enum value), array of string/number
 * @example
 * <div appHasPermission="GLOBAL_ADMIN"></div>
 * <div [appHasPermission]="32"></div>
 * <div [appHasPermission]="[32,2]"></div>
 * <div [appHasPermission]="['GLOBAL_ADMIN','ITEM_WRITE]"></div>
 *
 * <!-- For permission on types add [typeId]-->
 *
 * <div appHasPermission="GLOBAL_ADMIN" [typeId]="2"></div>>
 *
 */
@Directive({
    selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnDestroy, OnChanges {
    @Input()
    appHasPermission: string | number | string[] | number[];

    @Input()
    typeId: string;

    sub: Subscription;
    constructor(private permissionService: PermissionService, private el: ElementRef) {}

    ngOnChanges(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.observePermission();
    }

    /** Subscribes to the current set permission config */
    private observePermission() {
        this.sub = this.hasPermission(this.appHasPermission).subscribe(has => {
            if (has) {
                this.el.nativeElement.style.dispay = 'inherit';
            } else {
                this.el.nativeElement.style.display = 'none';
            }
        });
    }

    /** Handles the different types the given permission can be */
    private hasPermission(permissions: string | number | string[] | number[]) {
        if (permissions instanceof Array) {
            if (permissions.length) {
                const obs = (permissions as any).map((permission: any) => this.hasSinglePermission(permission));
                return combineLatest(obs).pipe(map(permRes => permRes.some((perm: boolean) => perm)));
            } else {
                return of(true);
            }
        } else if (!permissions) {
            return of(true);
        } else {
            return this.hasSinglePermission(permissions);
        }
    }

    /** Check if the user has a given permission. Handle string and int cases. In case of string, first translate it to the enum value */
    private hasSinglePermission(permission: string | number) {
        if (typeof permission === 'string') {
            return this.permissionService.hasPermission(this.permissionFromString(permission), this.typeId);
        } else {
            return this.permissionService.hasPermission(permission, this.typeId);
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    /** Convert a string to an actual permission enum */
    private permissionFromString(permission: string) {
        if (permission === 'GLOBAL_ADMIN') {
            return Permission.GLOBAL_ADMIN;
        }
        if (permission === 'LOCAL_ADMIN') {
            return Permission.LOCAL_ADMIN;
        }
        if (permission === 'ITEM_READ') {
            return Permission.ITEM_READ;
        }
        if (permission === 'ITEM_WRITE') {
            return Permission.ITEM_WRITE;
        }
        if (permission === 'TYPE_EDIT') {
            return Permission.TYPE_EDIT;
        }
        throw new Error(`Permission ${permission} does not exist!`);
    }
}
