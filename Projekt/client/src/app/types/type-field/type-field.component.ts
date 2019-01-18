import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeField } from 'src/app/stores/type-store/types/type-field.interface';
import { Type } from 'src/app/stores/type-store/types/type.interface';
import { FieldType } from 'src/app/stores/item-store/types/field-type.enum';

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
        // return Object.keys(FieldType).map(type => FieldType[type]);
        return Object.keys(FieldType)
            .map(type => FieldType[type])
            .filter(type => type !== 'reference' && type !== 'file');
    }

    /** set the type of the field */
    selectType(type) {
        this.field.type = type;
        this.field.referenceId = 0;
    }

    setReference(type: Type) {
        this.field.referenceId = type.id;
    }
}
