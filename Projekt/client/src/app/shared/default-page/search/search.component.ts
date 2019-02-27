import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

/**
 * A component for a nice searchbar
 */
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Output()
    search = new EventEmitter<string>();

    focused = false;

    @ViewChild('input', { read: ElementRef }) input: ElementRef<HTMLInputElement>;
    query = '';

    constructor() {}

    ngOnInit() {
        fromEvent(this.input.nativeElement, 'focus').subscribe(() => {
            this.focused = true;
        });
        fromEvent(this.input.nativeElement, 'blur').subscribe(() => {
            this.focused = false;
        });
    }

    get liftLabel() {
        return !this.focused && this.query === '';
    }

    searchFor(value) {
        this.query = value;
        this.search.next(value);
    }

    clearSearch(input) {
        input.value = '';
        this.searchFor('');
    }
}
