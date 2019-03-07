import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocompleteTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { User } from 'src/app/shell/auth/user.interface';

import { UserService } from '../_user-store/user.service';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    user: User;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    permissionCtrl = new FormControl();
    filteredPermissions: Observable<string[]>;
    permissions: string[] = ['USER'];
    allPermissions: string[] = ['MANAGER', 'ADMIN', 'USER'];

    @ViewChild('permissionInput') permissionInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @ViewChild('autoTrigger') matAutocompleteTrigger: MatAutocompleteTrigger;
    userSub: Subscription;
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private confirm: ConfirmDialogService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.selectUser(params['id']);
        });
    }
    selectUser(id: number): any {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
        this.userSub = this.userService.getUser(id).subscribe((user: User) => {
            this.user = user;
            this.permissions = user.roles.map(role => role.name);
        });
    }

    deleteUser() {
        this.confirm.open('user.delete', true).subscribe(() => {
            this.userSub.unsubscribe();
            this.userService.deleteUser(this.user.id).subscribe(res => {
                this.router.navigate(['/user/view']);
            });
        });
    }

    remove(permission: string): void {
        const index = this.permissions.indexOf(permission);

        if (index >= 0) {
            this.permissions.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const permission = event.option.viewValue;
        if (!this.permissions.includes(permission)) {
            this.permissions.push(event.option.viewValue);
            this.permissionInput.nativeElement.value = '';
            this.permissionCtrl.setValue(null);
            setTimeout(() => {
                this.matAutocompleteTrigger.openPanel();
            });
        }
    }
}
