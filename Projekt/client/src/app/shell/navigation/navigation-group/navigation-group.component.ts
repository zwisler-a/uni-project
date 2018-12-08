import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NavigationGroup } from '../types/navigation-group.interface';

@Component({
    selector: 'app-navigation-group',
    templateUrl: './navigation-group.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NavigationGroupComponent implements OnInit {
    @Input()
    group: NavigationGroup;

    @Input()
    collapsed = false;

    constructor() {}

    ngOnInit() {}
}
