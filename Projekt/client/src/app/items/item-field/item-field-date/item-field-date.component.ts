import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../types/field.interface';
import { FieldType } from '../../types/field-type.enum';

@Component({
    selector: 'app-item-field-date',
    templateUrl: './item-field-date.component.html',
    styleUrls: ['./item-field-date.component.scss']
})
export class ItemFieldDateComponent implements OnInit {
    @Input()
    field: DeterminedField<string> = {
        name: '',
        type: FieldType.string,
        value: ''
    };

    @Input()
    edit: boolean;

    constructor() {}

    ngOnInit() {}
}
