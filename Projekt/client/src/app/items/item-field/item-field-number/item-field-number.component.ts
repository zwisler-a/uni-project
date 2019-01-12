import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../types/field.interface';
import { FieldType } from '../../types/field-type.enum';

@Component({
    selector: 'app-item-field-number',
    templateUrl: './item-field-number.component.html',
    styleUrls: ['./item-field-number.component.scss']
})
export class ItemFieldNumberComponent implements OnInit {
    @Input()
    field: DeterminedField<number>  = {
        name: '',
        type: FieldType.number,
        value: 0
    };

    @Input()
    edit: boolean;
    constructor() {}

    ngOnInit() {}
}
