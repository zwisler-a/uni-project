import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../../models/field.interface';
import { FieldType } from '../../../models/field-type.enum';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-item-field-bool',
    templateUrl: './item-field-bool.component.html',
    styleUrls: ['./item-field-bool.component.scss']
})
export class ItemFieldBoolComponent implements OnInit {
    @Input()
    name: string;
    @Input()
    form: FormGroup;
    constructor() {}

    ngOnInit() {}
}
