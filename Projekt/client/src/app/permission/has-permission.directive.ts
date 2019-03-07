import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { PermissionService } from './permission.service';
import { Permission } from '../models/permission.enum';
import { PERMISSIONS } from '../models/role.interface';

@Directive({
    selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit {
    @Input()
    appHasPermission: string;
    constructor(private permissionService: PermissionService, private el: ElementRef) {
        console.log();
    }
    ngOnInit() {
        if (this.permissionService.hasPermission(this.permissionFromString(this.appHasPermission))) {
            this.el.nativeElement.style.visibility = 'inherit';
        } else {
            this.el.nativeElement.style.visibility = 'hidden';
        }
    }

    private permissionFromString(permission: string) {
        if (permission === 'GLOBAL_ADMIN') {
            return Permission.GLOBAL_ADMIN;
        }
        if (permission === 'LOCAL_ADMIN') {
            return Permission.LOCAL_ADMIN;
        }
        throw new Error(`Permission ${permission} does not exist!`);
    }
}
