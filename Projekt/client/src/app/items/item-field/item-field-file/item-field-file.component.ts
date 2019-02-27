import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-item-field-file',
    templateUrl: './item-field-file.component.html',
    styleUrls: ['./item-field-file.component.scss']
})
export class ItemFieldFileComponent implements OnInit {
    @Input()
    field: any;

    @Input()
    edit: boolean;
    constructor() {}

    ngOnInit() {}
}
