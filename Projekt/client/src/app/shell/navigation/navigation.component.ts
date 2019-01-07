import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { NavigationService } from './navigation.service';
import { NavigationGroup } from './types/navigation-group.interface';
import { SidenavMode } from './types/sidenav-mode.enum';
import { SidenavState } from './types/sidenav-state.enum';
import { User } from '../auth/user.interface';
import { AuthService } from '../auth/auth.service';

/**
 * Component to display a sidenav containing the navigation.
 * Has 3 Stages
 * - 1. Handheld mode for mobile devices
 * - 2. Collapsed mode for smaller displays (tablets)
 * - 3. Expanded for normal computers
 *
 * Navigation can be set via the NavigationService
 */
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
    mediaSub: Subscription;

    sidenavState = SidenavState.expanded;

    sidenavMode = SidenavMode.over;

    constructor(
        private navigationService: NavigationService,
        private mediaService: ObservableMedia,
        private authService: AuthService
    ) {}

    ngOnInit() {
        // Continuously react on resize events
        // function is passed as argument to better test determineNavigationState
        const isActive = this.mediaService.isActive.bind(this.mediaService);
        this.mediaSub = this.mediaService.subscribe(() => {
            this.determineNavigationState(isActive);
        });
        // initially handle resize
        this.determineNavigationState(isActive);
    }
    ngOnDestroy(): void {
        // Dont react on resize if component isn loaded
        if (this.mediaSub) {
            this.mediaSub.unsubscribe();
        }
    }

    /** Expose navigation model */
    get navigationModel(): NavigationGroup[] {
        return this.navigationService.navigationModel;
    }

    /** Expose user */
    get user(): User {
        return this.authService.user;
    }

    logout() {
        this.authService.logout();
    }

    /** Chooses a fitting state for the current display size */
    // Done with function as paramerter for testing
    determineNavigationState(isActive: (string) => boolean) {
        if (isActive('lt-md')) {
            // Handset
            this.sidenavMode = SidenavMode.over;
            this.sidenavState = SidenavState.hidden;
        }
        if (isActive('md')) {
            // tablet
            this.sidenavMode = SidenavMode.side;
            this.sidenavState = SidenavState.collapsed;
        }
        if (isActive('gt-md')) {
            // computer
            this.sidenavMode = SidenavMode.side;
            this.sidenavState = SidenavState.expanded;
        }
    }

    /** Represents the styles the sidenav needs to display it properly */
    get sidenavCssState() {
        return {
            'main-navigation': true,
            expanded: this.sidenavIsExpanded,
            collapsed: this.sidenavIsCollapsed,
            hidden: this.sidenavIsHidden,
            over: this.sidenavIsOver
        };
    }

    /** Determines if the backdrop should be shown */
    get displayBackdrop() {
        return this.sidenavIsOver && this.sidenavIsExpanded;
    }

    // Actions that can be perfomed on the sidenav

    /** Transition to sidenavState hide */
    hideSidenav() {
        this.sidenavState = SidenavState.hidden;
    }
    /** Transition to sidenavState collapsed */
    collapseSidenav() {
        this.sidenavState = SidenavState.collapsed;
    }
    /** Transition to sidenavState expanded */
    expandSidenav() {
        this.sidenavState = SidenavState.expanded;
    }

    // Helpers to make the code better readable
    get sidenavIsExpanded() {
        return this.sidenavState === SidenavState.expanded;
    }
    get sidenavIsCollapsed() {
        return this.sidenavState === SidenavState.collapsed;
    }
    get sidenavIsHidden() {
        return this.sidenavState === SidenavState.hidden;
    }
    get sidenavIsOver() {
        return this.sidenavMode === SidenavMode.over;
    }
    get sidenavIsSide() {
        return this.sidenavMode === SidenavMode.side;
    }
}
