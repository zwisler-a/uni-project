import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private confirm: ConfirmDialogService,
        private router: Router
    ) {
        this.filteredPermissions = this.permissionCtrl.valueChanges.pipe(
            startWith(null),
            map((permission: string | null) => (permission ? this._filter(permission) : this.allPermissions.slice()))
        );
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.selectUser(params['id']);
        });
    }
    selectUser(id: string): any {
        this.userService.getUser(id).subscribe(user => {
            this.user = user;
        });
    }

    deleteUser() {
        this.confirm.open('user.delete', true).subscribe(() => {
            this.userService.deleteUser(this.user.id).subscribe(res => {
                this.router.navigate(['/user/view']);
            });
        });
    }

    add(event: MatChipInputEvent): void {
        // Add permission only when MatAutocomplete is not open
        // To make sure this does not conflict with OptionSelected Event
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            // Add our permission
            if ((value || '').trim()) {
                this.permissions.push(value.trim());
            }

            // Reset the input value
            if (input) {
                input.value = '';
            }

            this.permissionCtrl.setValue(null);
        }
    }

    remove(permission: string): void {
        const index = this.permissions.indexOf(permission);

        if (index >= 0) {
            this.permissions.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.permissions.push(event.option.viewValue);
        this.permissionInput.nativeElement.value = '';
        this.permissionCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allPermissions.filter(permission => permission.toLowerCase().indexOf(filterValue) === 0);
    }
}
