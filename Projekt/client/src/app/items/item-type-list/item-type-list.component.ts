import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TypesService } from 'src/app/types/_type-store/types.service';

import { ItemService } from '../_item-store/item.service';

/**
 * List of all types available
 */
@Component({
    selector: 'app-item-type-list',
    templateUrl: './item-type-list.component.html'
})
export class ItemTypeListComponent implements OnInit, OnDestroy {
    paramsSub: Subscription;

    get types() {
        return this.typesService.types;
    }

    get page() {
        return this.itemService.listState.page;
    }

    get perPage() {
        return this.itemService.listState.perPage;
    }

    get typeId() {
        return this.itemService.listState.type;
    }

    constructor(private route: ActivatedRoute, private itemService: ItemService, private typesService: TypesService) {}

    ngOnInit() {}

    ngOnDestroy(): void {
        if (this.paramsSub) {
            this.paramsSub.unsubscribe();
        }
    }
}
