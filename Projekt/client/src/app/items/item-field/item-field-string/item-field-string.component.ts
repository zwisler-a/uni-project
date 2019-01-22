import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../../stores/item-store/types/field.interface';
import { FieldType } from '../../../stores/item-store/types/field-type.enum';

@Component({
    selector: 'app-item-field-string',
    templateUrl: './item-field-string.component.html',
    styleUrls: ['./item-field-string.component.scss']
})
export class ItemFieldStringComponent implements OnInit {
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
