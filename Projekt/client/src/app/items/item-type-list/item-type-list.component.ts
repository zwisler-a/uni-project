import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'src/app/util/autounsubscribe.decorator';

@Component({
    selector: 'app-item-type-list',
    templateUrl: './item-type-list.component.html',
    styleUrls: ['./item-type-list.component.scss']
})
@AutoUnsubscribe()
export class ItemTypeListComponent implements OnInit {
    paramsSub: any;
    page = 0;
    perPage = 0;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.paramsSub = this.route.params.subscribe(params => {
            this.page = params['page'];
            this.perPage = params['perPage'];
        });
    }
}
