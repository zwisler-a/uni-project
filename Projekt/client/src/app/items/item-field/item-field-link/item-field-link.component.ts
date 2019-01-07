import { Component, OnInit, Input } from '@angular/core';
import { LinkField, DeterminedField } from '../../types/field.interface';
import { FieldType } from '../../types/field-type.enum';

@Component({
    selector: 'app-item-field-link',
    templateUrl: './item-field-link.component.html',
    styleUrls: ['./item-field-link.component.scss']
})
export class ItemFieldLinkComponent implements OnInit {
    @Input()
    field: DeterminedField<LinkField> = {
        name: '',
        type: FieldType.link,
        value: { name: '', ref: '' }
    };
    @Input()
    edit: boolean;
    constructor() {}

    ngOnInit() {}
}
