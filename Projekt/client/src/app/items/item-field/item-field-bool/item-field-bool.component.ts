import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../../models/field.interface';
import { FieldType } from '../../../models/field-type.enum';
import { FormGroup } from '@angular/forms';
import { ItemFormControl } from '../../item-form-control';

@Component({
    selector: 'app-item-field-bool',
    templateUrl: './item-field-bool.component.html',
    styleUrls: ['./item-field-bool.component.scss']
})
export class ItemFieldBoolComponent implements OnInit {
    @Input()
    control: ItemFormControl;
    @Input()
    form: FormGroup;
    constructor() {}

    ngOnInit() {}
}
