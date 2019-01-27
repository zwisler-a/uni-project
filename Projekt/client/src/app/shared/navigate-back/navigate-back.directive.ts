import { Directive, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
    selector: '[appNavigateBack]'
})
export class NavigateBackDirective {
    constructor(private location: Location, private el: ElementRef) {
        this.el.nativeElement.addEventListener('click', this.back.bind(this));
    }

    /** Navigate back */
    back() {
        this.location.back();
    }
}
