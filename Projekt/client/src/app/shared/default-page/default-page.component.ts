import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatDrawer } from '@angular/material';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { DefaultPageAction } from './default-page-action.interface';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent implements OnInit, OnDestroy {
    title = 'title';
    actions = new BehaviorSubject<DefaultPageAction[]>([]);
    _actions = this.actions.pipe(delay(0));
    search = new BehaviorSubject('');

    @ViewChild('overlaySidenav') private overlaySidenav: MatDrawer;
    @ViewChild('leftSidenav') private leftSidenav: MatDrawer;
    private outletActive = {
        detail: false,
        sidenav: false
    };

    showSidenavMenuButton = false;

    private mediaSub: Subscription;
    constructor(private media: ObservableMedia, private router: Router, private activatedRoute: ActivatedRoute) {}

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
            this.leftSidenav.close();
            this.showSidenavMenuButton = true;
            setTimeout(() => {
                this.leftSidenav.mode = 'over';
            });
        } else {
            this.leftSidenav.open();
            this.showSidenavMenuButton = false;
            this.leftSidenav.mode = 'side';
        }
        if (!this.outletActive.sidenav) {
            this.leftSidenav.close();
            this.showSidenavMenuButton = false;
        }
    }

    /** Deavtivate outlet if an outlet is active */
    overlayClose() {
        if (this.outletActive) {
            this.router.navigate(['.', { outlets: { detail: null } }], {
                relativeTo: this.activatedRoute
            });
        }
    }

    /** Closes the sidenav */
    outletDeactivate(outlet: string) {
        if (outlet === 'detail') {
            this.overlaySidenav.close();
        } else if (outlet === 'sidenav') {
            this.leftSidenav.close();
        }
        this.outletActive[outlet] = false;
    }

    /** Open the sidenav */
    outletActivate(outlet: string) {
        if (outlet === 'detail') {
            this.overlaySidenav.open();
        } else if (outlet === 'sidenav') {
            this.leftSidenav.open();
        }
        this.outletActive[outlet] = true;
    }
}
