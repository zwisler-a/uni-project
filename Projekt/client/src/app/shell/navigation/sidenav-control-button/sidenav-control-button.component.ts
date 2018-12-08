import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SidenavState } from '../types/sidenav-state.enum';
import { SidenavMode } from '../types/sidenav-mode.enum';

@Component({
    selector: 'app-sidenav-control-button',
    templateUrl: './sidenav-control-button.component.html',
    styleUrls: ['./sidenav-control-button.component.scss']
})
export class SidenavControlButtonComponent implements OnInit {
    @Input()
    state: SidenavState;

    @Input()
    mode: SidenavMode;

    @Output()
    expand = new EventEmitter<void>();

    @Output()
    colapse = new EventEmitter<void>();

    @Output()
    hide = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}

    do() {
        if (this.state === SidenavState.expanded) {
            this.mode === SidenavMode.over
                ? this.hide.emit()
                : this.colapse.emit();
        } else {
            this.expand.emit();
        }
    }

    get icon() {
        return this.state !== SidenavState.expanded
            ? 'keyboard_arrow_right'
            : 'keyboard_arrow_left';
    }
}
