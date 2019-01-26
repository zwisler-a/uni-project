import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldType } from 'src/app/models/field-type.enum';
import { TypeField } from 'src/app/models/type-field.interface';
import { Type } from 'src/app/models/type.interface';

@Component({
    selector: 'app-type-field',
    templateUrl: './type-field.component.html',
    styleUrls: ['./type-field.component.scss']
})
export class TypeFieldComponent implements OnInit {
    /** field data */
    @Input()
    field: TypeField;

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
        return Object.keys(FieldType)
            .map(type => FieldType[type])
            .filter(type => type !== 'file');
    }

    /** set the type of the field */
    selectType(type) {
        this.field.type = type;
        this.field.referenceId = 0;
    }

    /** If the field is a reference set the reference ids */
    setReference(ev: { type: Type; field: TypeField }) {
        this.field.referenceId = ev.type.id;
        // this.field.referenceId = ev.field.id;
    }
}
