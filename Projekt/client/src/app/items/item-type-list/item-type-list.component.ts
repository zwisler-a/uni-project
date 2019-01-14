import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'src/app/util/autounsubscribe.decorator';

import { TypesService } from '../types.service';

/**
 * List of all types available
 */
@Component({
    selector: 'app-item-type-list',
    templateUrl: './item-type-list.component.html'
})
@AutoUnsubscribe()
export class ItemTypeListComponent implements OnInit {
    paramsSub: any;
    page = 0;
    perPage = 0;
    types: { id: number; name: string }[];

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private typesService: TypesService
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params.subscribe(params => {
            this.page = params['page'];
            this.perPage = params['perPage'];
        });
        this.typesService.getTypes().then((res: any) => {
            this.types = res;
        });
    }
}
