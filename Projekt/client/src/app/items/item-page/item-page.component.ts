import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

/**
 * Layout of the item display page.
 * Contains a Type selection and the search bar.
 */
@Component({
    selector: 'app-item-page',
    templateUrl: './item-page.component.html'
})
export class ItemPageComponent implements OnInit, OnDestroy {
    itemTypeSidenavOpen = true;
    itemTypeSidenavMode = 'side';

    mediaSub: Subscription;
    constructor(private media: ObservableMedia) {}

    ngOnInit() {
        this.mediaSub = this.media.subscribe(this.sidenavState.bind(this));
        this.sidenavState();
    }

    ngOnDestroy(): void {
        if (this.mediaSub) {
            this.mediaSub.unsubscribe();
        }
    }

    /** Determine if the sidenav should be open or close */
    private sidenavState() {
        if (this.media.isActive('lt-md')) {
            this.itemTypeSidenavOpen = false;
            this.itemTypeSidenavMode = 'over';
        } else {
            this.itemTypeSidenavOpen = true;
            this.itemTypeSidenavMode = 'side';
        }
    }

    /** Toggle item type */
    openItemType() {
        this.itemTypeSidenavOpen = !this.itemTypeSidenavOpen;
    }
}
