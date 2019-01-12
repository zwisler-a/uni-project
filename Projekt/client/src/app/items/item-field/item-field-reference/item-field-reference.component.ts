import { Component, OnInit, Input } from '@angular/core';
import { LinkField, DeterminedField } from '../../types/field.interface';
import { FieldType } from '../../types/field-type.enum';

@Component({
    selector: 'app-item-field-reference',
    templateUrl: './item-field-reference.component.html',
    styleUrls: ['./item-field-reference.component.scss']
})
export class ItemFieldReferenceComponent implements OnInit {
    @Input()
    field: DeterminedField<LinkField> = {
        name: '',
        type: FieldType.reference,
        value: { name: '', ref: '' }
    };
    @Input()
    edit: boolean;
    constructor() {}

    ngOnInit() {}
}
