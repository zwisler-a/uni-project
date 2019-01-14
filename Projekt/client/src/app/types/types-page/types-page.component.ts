import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-types-page',
    templateUrl: './types-page.component.html',
    styleUrls: ['./types-page.component.scss']
})
export class TypesPageComponent implements OnInit {
    itemTypeSidenavOpen = true;
    itemTypeSidenavMode = 'side';

    mediaSub: Subscription;
    constructor(private media: ObservableMedia) {}

    ngOnInit() {
        this.mediaSub = this.media.subscribe(this.sidenavState.bind(this));
        this.sidenavState();
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
