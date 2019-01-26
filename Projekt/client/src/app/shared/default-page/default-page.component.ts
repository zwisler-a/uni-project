import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatDrawer } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
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
    sidenavOpen = true;
    sidenavMode = 'side';
    @ViewChild('overlaySidenav') private drawer: MatDrawer;
    private outletActive = false;

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
            this.sidenavOpen = false;
            this.sidenavMode = 'over';
        } else {
            this.sidenavOpen = true;
            this.sidenavMode = 'side';
        }
    }

    /** Toggle item type */
    openSidenav() {
        this.sidenavOpen = !this.sidenavOpen;
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
    outletDeactivate() {
        this.drawer.close();
        this.outletActive = false;
    }

    /** Open the sidenav */
    outletActivate() {
        this.drawer.open();
        this.outletActive = true;
    }
}
