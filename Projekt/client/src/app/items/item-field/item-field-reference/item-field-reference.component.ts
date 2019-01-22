import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField, LinkField } from '../../../stores/item-store/types/field.interface';
import { FieldType } from '../../../stores/item-store/types/field-type.enum';
@Component({
    selector: 'app-item-field-reference',
    templateUrl: './item-field-reference.component.html',
    styleUrls: ['./item-field-reference.component.scss']
})
export class ItemFieldReferenceComponent implements OnInit {
    @Input()
    field: DeterminedField<LinkField> = {
        name: '',
        type: 'reference',
        value: { name: '', ref: '' }
    };
    @Input()
    edit: boolean;
    constructor() {}

    ngOnInit() {}
}
