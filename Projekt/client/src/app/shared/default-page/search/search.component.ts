import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    constructor() {}

    ngOnInit() {}

    clearSearch(input) {
        input.value = '';
        this.search.emit('');
    }
}
