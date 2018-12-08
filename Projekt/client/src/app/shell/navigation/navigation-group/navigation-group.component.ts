import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NavigationGroup } from '../types/navigation-group.interface';

/**
 * Component to display the actual NavigationGroup
 */
@Component({
    selector: 'app-navigation-group',
    templateUrl: './navigation-group.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NavigationGroupComponent implements OnInit {
    /** Group to display */
    @Input()
    group: NavigationGroup;

    /** If it should display the navigation in smaller form */
    @Input()
    collapsed = false;

    constructor() {}

    ngOnInit() {}
}
