import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../types/field.interface';
import { FieldType } from '../../types/field-type.enum';

@Component({
    selector: 'app-item-field-bool',
    templateUrl: './item-field-bool.component.html',
    styleUrls: ['./item-field-bool.component.scss']
})
export class ItemFieldBoolComponent implements OnInit {
    @Input()
    field: DeterminedField<boolean> = {
        name: '',
        type: FieldType.boolean,
        value: false
    };
    @Input()
    edit: boolean;
    constructor() {}

    ngOnInit() {}
}
