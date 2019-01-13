import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDrawer } from '@angular/material';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-sidenav-overlay',
    templateUrl: './sidenav-overlay.component.html',
    styleUrls: ['./sidenav-overlay.component.scss']
})
export class SidenavOverlayComponent implements OnInit {
    @ViewChild(MatDrawer) private drawer: MatDrawer;
    @ViewChild('detailOutlet') private detailOutlet: RouterOutlet;
    private outletActive = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {}

    drawerClose() {
        if (this.outletActive) {
            this.router.navigate(['.', { outlets: { detail: null } }], {
                relativeTo: this.activatedRoute
            });
        }
    }

    outletDeactivate() {
        this.drawer.close();
        this.outletActive = false;
    }

    outletActivate() {
        this.drawer.open();
        this.outletActive = true;
    }
}
