import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldType } from 'src/app/models/field-type.enum';
import { TypeField } from 'src/app/models/type-field.interface';
import { Type } from 'src/app/models/type.interface';
import { fadeInOut } from 'src/app/shared/animations';
import { TypeSelectEvent } from 'src/app/shared/type-selector/type-selector-event.interface';

/**
 * TODO needs refac
 */
@Component({
    selector: 'app-type-field',
    templateUrl: './type-field.component.html',
    styleUrls: ['./type-field.component.scss'],
    animations: [fadeInOut]
})
export class TypeFieldComponent implements OnInit {
    /** field data */
    @Input()
    field: TypeField;

    /** if the field should be editable */
    @Input()
    edit = false;

    @Input()
    isGlobal = false;

    /** Emit when the delete button is clicked */
    @Output()
    deleteMe = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}

    /** set the type of the field */
    selectType(type) {
        this.field.type = type;
        this.field.referenceId = 0;
    }

    /** If the field is a reference set the reference ids */
    setReference(ev: TypeSelectEvent) {
        this.field.referenceId = ev.fieldId;
        // this.field.referenceId = ev.field.id;
    }

    get reference(): TypeSelectEvent {
        const ref = this.field.referenceId as any;
        return { typeId: ref ? ref.typeId : 0, fieldId: ref ? ref.fieldId : 0 };
    }
}
