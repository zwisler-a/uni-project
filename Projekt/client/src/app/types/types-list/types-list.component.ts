import { Component, Host, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

import { TypesService } from '../_type-store/types.service';
import { combineLatest } from 'rxjs';
import { Type } from 'src/app/models/type.interface';

/** Lists all types */
@Component({
    selector: 'app-types-list',
    templateUrl: './types-list.component.html',
    styleUrls: ['./types-list.component.scss']
})
export class TypesListComponent implements OnInit {
    types;
    constructor(
        private typeService: TypesService,
        @Optional() @Host() private defaultPage: DefaultPageComponent,
        private router: Router
    ) {}

    ngOnInit() {
        this.defaultPage.title = 'types.title';
        this.defaultPage.actions.next([
            {
                icon: 'add',
                click: () => {
                    this.router.navigate(['/types', 'view', { outlets: { detail: ['add'] } }]);
                },
                tooltip: ''
            }
        ]);

        this.types = combineLatest(this.typeService.types, this.defaultPage.search, (types: Type[], query: string) => {
            return types.filter(type => type.name.includes(query));
        });
    }
}
