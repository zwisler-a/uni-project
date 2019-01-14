import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/** Component to have a sidenav with a router-outlet */
@Component({
    selector: 'app-sidenav-overlay',
    templateUrl: './sidenav-overlay.component.html',
    styleUrls: ['./sidenav-overlay.component.scss']
})
export class SidenavOverlayComponent implements OnInit {
    @ViewChild(MatDrawer) private drawer: MatDrawer;
    private outletActive = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {}

    /** Deavtivate outlet if an outlet is active */
    drawerClose() {
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
