import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../../models/field.interface';
import { FieldType } from '../../../models/field-type.enum';
import { FormGroup } from '@angular/forms';
import { ItemFormControl } from '../../item-form-control';

@Component({
    selector: 'app-item-field-string',
    templateUrl: './item-field-string.component.html',
    styleUrls: ['./item-field-string.component.scss']
})
export class ItemFieldStringComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    control: ItemFormControl;

    constructor() {}

    ngOnInit() {}
}
