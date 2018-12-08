import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SidenavState } from '../types/sidenav-state.enum';
import { SidenavMode } from '../types/sidenav-mode.enum';
/**
 * Component to decide in which state the sidenav should transition.
 * Also properly indicates whats its going todo once clicked
 */
@Component({
    selector: 'app-sidenav-control-button',
    templateUrl: './sidenav-control-button.component.html',
    styleUrls: ['./sidenav-control-button.component.scss']
})
export class SidenavControlButtonComponent implements OnInit {
    /** State of the sidenav */
    @Input()
    state: SidenavState;
    /** Mode of the sidenav */
    @Input()
    mode: SidenavMode;

    // One of these gets triggered if the button is clicked
    @Output()
    expand = new EventEmitter<void>();

    @Output()
    colapse = new EventEmitter<void>();

    @Output()
    hide = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}

    /** Handles the decision making what should happen when the button is pressen */
    do() {
        if (this.state === SidenavState.expanded) {
            this.mode === SidenavMode.over
                ? this.hide.emit()
                : this.colapse.emit();
        } else {
            this.expand.emit();
        }
    }

    /** Decides which icon should be displayed */
    get icon() {
        return this.state !== SidenavState.expanded
            ? 'keyboard_arrow_right'
            : 'keyboard_arrow_left';
    }
}
