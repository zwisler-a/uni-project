import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldType } from '../../models/field-type.enum';

/**
 * Wrapper to decide which kind of input should be shown for the item field.
 * Each type has its own component handling the specific logic of the input
 */
@Component({
    selector: 'app-item-field',
    templateUrl: './item-field.component.html',
    styleUrls: ['./item-field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ItemFieldComponent implements OnInit {
    /** The field which should be displayed */
    @Input()
    field: Field;

    /** If the field should be edited */
    @Input()
    edit: boolean;

    constructor() {}

    ngOnInit() {}

    /** Pass enum to dom */
    get FieldType() {
        return FieldType;
    }
}
