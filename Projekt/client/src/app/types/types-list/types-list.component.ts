import { Component, Host, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from 'src/app/models/permission.enum';
import { Type } from 'src/app/models/type.interface';
import { PermissionService } from 'src/app/permission/permission.service';
import { fadeInOut } from 'src/app/shared/animations';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

import { TypesService } from '../_type-store/types.service';

/** Lists all types */
@Component({
    selector: 'app-types-list',
    templateUrl: './types-list.component.html',
    styleUrls: ['./types-list.component.scss'],
    animations: [fadeInOut]
})
export class TypesListComponent implements OnInit {
    types;
    constructor(
        private typeService: TypesService,
        private permissionService: PermissionService,
        @Optional() @Host() private defaultPage: DefaultPageComponent,
        private router: Router
    ) {}

    ngOnInit() {
        // set title and action of the page
        this.defaultPage.title = 'types.title';
        this.permissionService.hasPermission(Permission.GLOBAL_FIELD).subscribe(hasPermission => {
            const actions = [
                {
                    icon: 'add',
                    click: () => {
                        this.router.navigate(['/types', 'view', { outlets: { detail: ['add'] } }]);
                    },
                    tooltip: ''
                }
            ];
            if (hasPermission) {
                this.defaultPage.actions.next(
                    actions.concat({
                        icon: 'public',
                        click: () => {
                            this.router.navigate(['/types', 'view', { outlets: { detail: ['fields'] } }]);
                        },
                        tooltip: ''
                    })
                );
            } else {
                this.defaultPage.actions.next(actions);
            }
        });

        // filter types by searchQuery from defaultPage
        this.types = combineLatest(this.typeService.types, this.defaultPage.search).pipe(
            map(([types, query]: [Type[], string]) => {
                return types.filter(type => type.name.includes(query));
            })
        );
    }

    /** Function to track type for ngFor */
    typeTrackBy(index, type: Type) {
        return type && type.id;
    }
}
