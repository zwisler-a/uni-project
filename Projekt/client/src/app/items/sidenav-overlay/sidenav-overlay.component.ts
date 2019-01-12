import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDrawer } from '@angular/material';

@Component({
    selector: 'app-sidenav-overlay',
    templateUrl: './sidenav-overlay.component.html',
    styleUrls: ['./sidenav-overlay.component.scss']
})
export class SidenavOverlayComponent implements OnInit {
    @ViewChild(MatDrawer) private drawer: MatDrawer;
    private outletActive = false;

    constructor(private location: Location) {}

    ngOnInit() {}

    drawerClose() {
        if (this.outletActive) {
            this.location.back();
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
