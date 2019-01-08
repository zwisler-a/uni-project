import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'src/app/util/autounsubscribe.decorator';
import { Subscription } from 'rxjs';
import { ObservableMedia } from '@angular/flex-layout';

/**
 * Layout of the item display page.
 * Contains a Type selection and the search bar.
 */
@Component({
    selector: 'app-item-page',
    templateUrl: './item-page.component.html'
})
@AutoUnsubscribe()
export class ItemPageComponent implements OnInit {
    page: any;
    perPage: any;
    itemTypeSidenavOpen = true;
    itemTypeSidenavMode = 'side';

    paramsSub: Subscription;
    mediaSub: Subscription;
    constructor(
        private route: ActivatedRoute,
        private media: ObservableMedia
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params.subscribe(params => {
            this.page = params['page'];
            this.perPage = params['perPage'];
        });
        this.mediaSub = this.media.subscribe(this.sidenavState.bind(this));
    }

    private sidenavState() {
        if (this.media.isActive('lt-md')) {
            this.itemTypeSidenavOpen = false;
            this.itemTypeSidenavMode = 'over';
        } else {
            this.itemTypeSidenavOpen = true;
            this.itemTypeSidenavMode = 'side';
        }
    }

    openItemType() {
        this.itemTypeSidenavOpen = !this.itemTypeSidenavOpen;
    }
}
