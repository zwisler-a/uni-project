import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldType } from 'src/app/models/field-type.enum';

@Component({
    selector: 'app-field-type-select',
    templateUrl: './field-type-select.component.html',
    styleUrls: ['./field-type-select.component.scss']
})
export class FieldTypeSelectComponent implements OnInit {
    @Input()
    disabled = true;

    @Input()
    type = FieldType.string;

    @Output()
    select = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {}

    /** possible field types */
    get fieldTypes() {
        return Object.keys(FieldType)
            .map(type => FieldType[type]);
    }

    selectType(type) {
        this.type = type;
        this.select.next(type);
    }
}
