import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DeterminedField } from '../../../models/field.interface';
import { FieldType } from '../../../models/field-type.enum';
import { FormGroup } from '@angular/forms';
import { ItemFormControl } from '../../item-form-control';

@Component({
    selector: 'app-item-field-date',
    templateUrl: './item-field-date.component.html',
    styleUrls: ['./item-field-date.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ItemFieldDateComponent implements OnInit {

    @Input()
    control: ItemFormControl;
    @Input()
    form: FormGroup;

    constructor() {}

    ngOnInit() {}
}
