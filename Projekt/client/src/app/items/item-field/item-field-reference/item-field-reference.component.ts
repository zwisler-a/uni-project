import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField, LinkField } from '../../../models/field.interface';
import { FieldType } from '../../../models/field-type.enum';
@Component({
    selector: 'app-item-field-reference',
    templateUrl: './item-field-reference.component.html',
    styleUrls: ['./item-field-reference.component.scss']
})
export class ItemFieldReferenceComponent implements OnInit {
    @Input()
    field: DeterminedField<any> = {
        name: '',
        type: 'reference',
        value: { name: '', ref: '' }
    };
    @Input()
    edit: boolean;
    constructor() {}

    ngOnInit() {}
}
