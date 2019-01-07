import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    RouteConfigLoadEnd,
    RouteConfigLoadStart,
    Router,
    RouterEvent,
    ResolveStart
} from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * Displays the current state the navigation is in.
 * Think youtube loading indicator on top
 */
@Component({
    selector: 'app-router-loading-indicator',
    templateUrl: './router-loading-indicator.component.html',
    styleUrls: ['./router-loading-indicator.component.scss']
})
export class RouterLoadingIndicatorComponent implements OnInit, OnDestroy {
    /** Color of the MatProgressBar */
    @Input()
    color = 'accent';

    routerEventSub: Subscription;
    /** current progress in the navigation event */
    loadingProgress = 0;
    constructor(private router: Router) {}

    ngOnInit() {
        // React to router events and show the loading indicator accoringly
        // Values are 'hardcoded' since we dont know how long it will actually take
        this.routerEventSub = this.router.events.subscribe(
            (event: RouterEvent) => {
                if (event instanceof NavigationStart) {
                    // Navigation is triggered
                    this.loadingProgress = 0;
                } else if (event instanceof RouteConfigLoadStart) {
                    // Lazyloaded routes start loading
                    this.loadingProgress = 20;
                } else if (event instanceof RouteConfigLoadEnd) {
                    // lazy loaded routes are done
                    this.loadingProgress = 50;
                } else if (event instanceof ResolveStart) {
                    // Route starts fetching its data
                    this.loadingProgress = 60;
                    setTimeout(() => {
                        this.loadingProgress === 60
                            ? (this.loadingProgress = 80)
                            : (this.loadingProgress = 0);
                    }, 1000);
                } else if (event instanceof RouteConfigLoadEnd) {
                    // Route fetched its data
                    this.loadingProgress = 90;
                } else if (event instanceof NavigationEnd) {
                    // Navigation has finished
                    this.loadingProgress = 0;
                } else if (event instanceof NavigationCancel) {
                    this.loadingProgress = 0;
                } else if (event instanceof NavigationError) {
                    this.loadingProgress = 0;
                }
            }
        );
    }

    /** Determines if the loading indicator should be hidden */
    get hide() {
        const progress = this.loadingProgress;
        return progress === 0 || progress === 100;
    }

    ngOnDestroy(): void {
        if (this.routerEventSub) {
            this.routerEventSub.unsubscribe();
        }
    }
}
