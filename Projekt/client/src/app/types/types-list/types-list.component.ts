import { Component, OnInit } from '@angular/core';

import { TypesService } from '../../stores/type-store/types.service';

/** Lists all types */
@Component({
    selector: 'app-types-list',
    templateUrl: './types-list.component.html',
    styleUrls: ['./types-list.component.scss']
})
export class TypesListComponent implements OnInit {
    get types() {
        return this.typeService.types;
    }
    constructor(private typeService: TypesService) {}

    ngOnInit() {}
}
