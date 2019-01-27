import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../../models/field.interface';
import { FieldType } from '../../../models/field-type.enum';

@Component({
    selector: 'app-item-field-bool',
    templateUrl: './item-field-bool.component.html',
    styleUrls: ['./item-field-bool.component.scss']
})
export class ItemFieldBoolComponent implements OnInit {
    _field: DeterminedField<boolean> = {
        name: '',
        type: FieldType.boolean,
        value: false
    };

    @Input()
    set field(val: DeterminedField<boolean>) {
        this._field = val;
        this._field.value = !!this._field.value;
    }
    get field() {
        return this._field;
    }
    @Input()
    edit: boolean;
    constructor() {}

    ngOnInit() {}
}
