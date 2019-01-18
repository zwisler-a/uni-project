import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { TypesService } from '../../stores/type-store/types.service';

/**
 * List of all types available
 */
@Component({
    selector: 'app-item-type-list',
    templateUrl: './item-type-list.component.html'
})
export class ItemTypeListComponent implements OnInit, OnDestroy {
    paramsSub: Subscription;
    page = 0;
    perPage = 0;
    typeId = 0;
    get types() {
        return this.typesService.types;
    }

    constructor(
        private route: ActivatedRoute,
        private typesService: TypesService
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params.subscribe(params => {
            this.page = params['page'];
            this.perPage = params['perPage'];
            this.typeId = params['itemTypeId'];
        });
    }

    ngOnDestroy(): void {
        if (this.paramsSub) {
            this.paramsSub.unsubscribe();
        }
    }
}
