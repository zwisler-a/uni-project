import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiTypeField } from '../types/api-type-field.interface';
import { FieldType } from 'src/app/items/types/field-type.enum';

@Component({
    selector: 'app-type-field',
    templateUrl: './type-field.component.html',
    styleUrls: ['./type-field.component.scss']
})
export class TypeFieldComponent implements OnInit {
    @Input()
    field: ApiTypeField;

    @Input()
    edit = false;

    @Output()
    deleteMe = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}

    get fieldTypes() {
        return [
            'string',
            'number',
            'boolean',
            'color',
            'date'
        ];
    }

    selectType(type) {
        this.field.type = type;
    }
}
