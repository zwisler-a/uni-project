import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ApiTypeField } from '../types/api-type-field.interface';

@Component({
    selector: 'app-type-field',
    templateUrl: './type-field.component.html',
    styleUrls: ['./type-field.component.scss']
})
export class TypeFieldComponent implements OnInit {
    /** field data */
    @Input()
    field: ApiTypeField;

    /** if the field should be editable */
    @Input()
    edit = false;

    /** Emit when the delete button is clicked */
    @Output()
    deleteMe = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}

    /** possible field types */
    get fieldTypes() {
        return ['string', 'number', 'boolean', 'color', 'date'];
    }

    /** set the type of the field */
    selectType(type) {
        this.field.type = type;
    }
}
