import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, merge, OperatorFunction, combineLatest } from 'rxjs';
import { MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material';
import { RoleService } from 'src/app/roles/_roles-store/role.service';
import { map, startWith } from 'rxjs/operators';
import { Role } from 'src/app/models/role.interface';

@Component({
    selector: 'app-role-selector',
    templateUrl: './role-selector.component.html',
    styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent implements OnInit {
    roleCtrl = new FormControl();
    @Input()
    roles: Role[] = [];

    @ViewChild('permissionInput') permissionInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @ViewChild('autoTrigger') matAutocompleteTrigger: MatAutocompleteTrigger;
    constructor(private roleService: RoleService) {
        this.roleService.loadRoles().subscribe();
        this.roleCtrl.setValue('');
    }

    roles$ = combineLatest(this.roleService.roles, this.roleCtrl.valueChanges.pipe(startWith(''))).pipe(
        this.filterInputRoles(),
        this.filterExistingRoles()
    );

    /** Filter the roles by matches in the input */
    private filterInputRoles(): OperatorFunction<any, Role[]> {
        return map(([roles, valueChanges]: [Role[], string | Role | null]) => {
            if (valueChanges === null || valueChanges['id'] || valueChanges === '') {
                return roles;
            }
            return roles.filter(role => role.name.includes(valueChanges));
        });
    }

    /** Romove roles which are already assigned */
    private filterExistingRoles() {
        return map((roles: Role[]) => {
            return roles.filter(role => !this.roles.some(selectedRole => selectedRole.id === role.id));
        });
    }

    ngOnInit() {}

    remove(role: Role): void {
        const index = this.roles.indexOf(role);
        this.roleCtrl.setValue('');
        if (index >= 0) {
            this.roles.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const role: Role = event.option.value as any;
        if (!this.roles.includes(role)) {
            this.roles.push(role);
            this.permissionInput.nativeElement.value = '';
            this.roleCtrl.setValue(null);
            setTimeout(() => {
                this.matAutocompleteTrigger.openPanel();
            });
        }
    }
}
