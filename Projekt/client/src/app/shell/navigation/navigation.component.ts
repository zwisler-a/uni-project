import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationGroup } from './navigation.interface';
import { NavigationService } from './navigation.service';
import {
    Router,
    RouterEvent,
    NavigationStart,
    RouteConfigLoadStart,
    RouteConfigLoadEnd,
    NavigationEnd,
    NavigationError,
    NavigationCancel
} from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableMedia } from '@angular/flex-layout';

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
    /** Value of the loading indicator */
    loadingProgress = 0;

    // Subscriptions
    routerEventSub: Subscription;
    mediaSub: Subscription;

    /** Possible states of the sidenav */
    // no enum since it should be visible in view
    readonly NavigationState = {
        expanded: 1,
        collapsed: 2,
        hidden: 3
    };
    navigationState = this.NavigationState.expanded;

    /** How the sidenav should be displayed */
    readonly NavigationMode = {
        over: 1,
        side: 2
    };
    navigationMode = this.NavigationMode.over;

    constructor(
        private navigationService: NavigationService,
        private mediaService: ObservableMedia,
        private router: Router
    ) {}

    ngOnInit() {
        // React to router events and show the loading indicator accoringly
        // Values are 'hardcoded' since we dont know how long it will actually take
        this.routerEventSub = this.router.events.subscribe(
            (event: RouterEvent) => {
                if (event instanceof NavigationStart) {
                    this.loadingProgress = 0;
                } else if (event instanceof RouteConfigLoadStart) {
                    this.loadingProgress = 20;
                } else if (event instanceof RouteConfigLoadEnd) {
                    this.loadingProgress = 90;
                } else if (event instanceof NavigationEnd) {
                    this.loadingProgress = 0;
                } else if (event instanceof NavigationError) {
                    // Handle error
                } else if (event instanceof NavigationCancel) {
                    this.loadingProgress = 0;
                }
            }
        );

        // Continuously react on resize events
        this.mediaSub = this.mediaService.subscribe(() => {
            this.determineNavigationState();
        });
        // initially handle resize
        this.determineNavigationState();
    }

    ngOnDestroy(): void {
        // Dont react to router events once the component is destroyed
        if (this.routerEventSub) {
            this.routerEventSub.unsubscribe();
        }
        // Dont react on resize if component isn loaded
        if (this.mediaSub) {
            this.mediaSub.unsubscribe();
        }
    }

    /** Expose navigation model */
    get navigationModel(): NavigationGroup[] {
        return this.navigationService.navigationModel;
    }

    /** Chooses a fitting state for the current display size */
    private determineNavigationState() {
        if (this.mediaService.isActive('lt-md')) {
            // Handset
            this.navigationMode = this.NavigationMode.over;
            this.navigationState = this.NavigationState.hidden;
        }
        if (this.mediaService.isActive('md')) {
            // tablet
            this.navigationMode = this.NavigationMode.side;
            this.navigationState = this.NavigationState.collapsed;
        }
        if (this.mediaService.isActive('gt-md')) {
            // computer
            this.navigationMode = this.NavigationMode.side;
            this.navigationState = this.NavigationState.expanded;
        }
    }
}
